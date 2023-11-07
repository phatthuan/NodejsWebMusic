const catchAsync = require('../utils/catchAsync');
const validateUser = require('../validate/auth.validate');
const { AppError } = require('../utils/error.util');
const AccountModel = require('../models/account.model');
const { getAll } = require('./factory.controller');
const TokenJwt = require('../utils/token');
const { ROLE } = require('../constants');

exports.signUp = catchAsync(async (req, res, next) => {
	const { name, email, password, passwordConfirm } = req.body;
	const { error } = validateUser.signUp({ name, email, password, passwordConfirm });
	if (error) return next(new AppError(error.details[0].message, 400));

	const isExist = await AccountModel.findOne({ email });
	if (isExist) return next(new AppError('Email already exists', 400));

	const newUser = await AccountModel.create({
		name,
		email,
		password,
		passwordConfirm,
	});

	await TokenJwt.createSendToken(newUser, 200, req, res);
});

// test api
exports.getAccounts = getAll(AccountModel);

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const { error } = validateUser.login({ email, password });
	if (error) {
		next(new AppError(error.details[0].message, 400));
		return;
	}

	const user = await AccountModel.findOne({ email }).select('+password');
	if (!user) {
		next(new AppError('Email or password is incorrect', 400));
		return;
	}

	const isValidPassword = await user.isValidPassword(password);
	if (!isValidPassword) {
		next(new AppError('Email or password is incorrect', 401));
		return;
	}

	if (user.active === false) {
		next(
			new AppError(
				'Your account has locked temporarily. Please contact admin to unlock account',
				401
			)
		);
		return;
	}

	req.session.user = user;
	await TokenJwt.createSendToken(user, 200, req, res);
});

exports.protectedRoutes = catchAsync(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError('You are not logged in! Please log in to get access.', 401));
	}

	const decoded = await TokenJwt.verifyAccessToken(token);
	console.log(decoded);

	const userId = decoded.userId;
	const freshUser = await AccountModel.findOne({ _id: userId });
	if (!freshUser?._id) {
		return next(new AppError('The user belonging to this token does no longer exist.', 401));
	}

	if (freshUser.isPasswordChangedAfter(decoded.iat)) {
		return next(new AppError('User recently changed password! Please log in again.', 401));
	}
	req.session.user = freshUser;
	next();
});

exports.logout = (req, res) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	req.session.destroy();
	res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

exports.changePassword = catchAsync(async (req, res, next) => {
	const { currentPassword, newPassword, newPasswordConfirm } = req.body;
	const { error } = validateUser.changePassword({
		currentPassword,
		newPassword,
		newPasswordConfirm,
	});
	console.log(error);
	if (error) {
		next(new AppError(error.details[0].message, 400));
		return;
	}

	const user = await AccountModel.findById(req.session.user._id).select('+password');
	if (!user) {
		next(new AppError('User not found', 404));
		return;
	}

	const isValidPassword = await user.isValidPassword(currentPassword);
	if (!isValidPassword) {
		next(new AppError('Current password is incorrect', 401));
		return;
	}

	user.password = newPassword;
	user.passwordConfirm = newPasswordConfirm;
	await user.save();
	return res.status(200).json({ status: 200, message: 'Password changed successfully' });
});

exports.restrictTo = (roles) => {
	return (req, res, next) => {
		const user = req.session.user;
		const userRole = user?.role || ROLE.USER;
		if (!userRole || !roles.includes(userRole)) {
			return next(new AppError('You do not have permission to perform this action', 403));
		}
		next();
	};
};

exports.getMe = catchAsync(async (req, res, next) => {
	const user = req.session.user;
	if (!user) {
		return next(new AppError('User not found', 404));
	}
	res.status(200).json({ status: 200, data: user });
});

exports.getLockedAccount = catchAsync(async (req, res, next) => {
	const userLocked = await AccountModel.find({ active: false });
	res.status(200).json({ status: 200, data: userLocked });
});

exports.toggleLockAccount = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(new AppError('User not found', 404));
	}

	const account = await AccountModel.findById(id);

	if (!account) {
		return next(new AppError('User not found', 404));
	}

	if (account.role === ROLE.ADMIN) {
		return next(new AppError('You can not lock admin account', 403));
	}
	const isLocked = account.active ? true : false;
	account.active = !isLocked;

	await account.save();
	res
		.status(200)
		.json({ status: 200, message: `${isLocked ? 'Lock' : 'Unlock'} account successfully` });
});
