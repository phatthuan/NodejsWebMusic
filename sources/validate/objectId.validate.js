const Joi = require('joi');
const mongoose = require('mongoose');

const objectIdSchema = Joi.object().custom((value, helpers) => {
	if (!mongoose.Types.ObjectId.isValid(value)) {
		return helpers.message('Invalid id');
	}
	return value;
});

module.exports = objectIdSchema;
