const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema(
	{
		id: { type: String, default: mongoose.Types.ObjectId },
		name: { type: String, required: true },
		link: { type: String, required: true },
		title: { type: String, required: true },
		alias: { type: String, required: true },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const GenreModel = mongoose.model('Genre', genreSchema);
module.exports = GenreModel;
