const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLE } = require('../constants/index');

const accountSchema = new mongoose.Schema({
	id: {
		type: String,
		default: mongoose.Types.ObjectId,
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
	},
	name: {
		type: String,
		required: [true, 'Please tell us your name'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		validate: {
			// This only works on CREATE and SAVE!!!
			validator: function (el) {
				return el === this.password;
			},
			message: 'Passwords are not the same!',
		},
	},
	role: {
		type: String,
		enum: [ROLE.ADMIN, ROLE.USER, ROLE.MANAGER],
		default: ROLE.USER,
	},
	passwordChangedAt: Date,
	active: {
		type: Boolean,
		default: true,
	},
});

accountSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next();

	// Hash the password
	this.password = await bcrypt.hash(this.password, 12);

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

accountSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();
	// Subtract 1 second from the current time to avoid the token being created before the password was changed
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// accountSchema.pre(/^find/, function (next) {
// 	// Query all documents that have active property with value of true
// 	this.find({ active: { $ne: false } });
// 	next();
// });

accountSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (err) {
		return Promise.reject(false);
	}
};

accountSchema.methods.isPasswordChangedAfter = function (jwtTimeStamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
		// true means password has changed after jwt was provided
		return jwtTimeStamp < changedTimeStamp;
	}
	// false means not changed
	return false;
};

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;
