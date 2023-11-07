const Joi = require('joi');
exports.signUp = (userData) => {
	const userSchema = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().min(6).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
		passwordConfirm: Joi.any()
			.valid(Joi.ref('password'))
			.messages({
				'any.only': 'Password and password confirm must be the same',
			})
			.required(),
	});

	return userSchema.validate(userData);
};

exports.login = (userData) => {
	const userSchema = Joi.object({
		email: Joi.string().min(6).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
	});

	return userSchema.validate(userData);
};

exports.changePassword = (userData) => {
	const userSchema = Joi.object({
		currentPassword: Joi.string().min(8).max(1024).required(),
		newPassword: Joi.string()
			.min(8)
			.max(1024)
			// .valid(Joi.ref('currentPassword'))
			.not(Joi.ref('currentPassword'))
			.messages({
				'any.invalid': 'New password must be different from current password',
			})
			.required(),
		newPasswordConfirm: Joi.any()
			.valid(Joi.ref('newPassword'))
			.messages({
				'any.only': 'New password and password confirm confirm must be the same',
			})
			.required(),
	});

	return userSchema.validate(userData);
};
