const Joi = require('joi');

exports.createOne = (genreData) => {
	const genreSchema = Joi.object({
		name: Joi.string().min(3).max(255).required(),
	});

	return genreSchema.validate(genreData);
};
