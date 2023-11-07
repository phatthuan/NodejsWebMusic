const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema({
	id: { type: String, default: mongoose.Types.ObjectId },
	title: { type: String },
	link: { type: String },
	thumbnail: { type: String },
	artists: {
		type: [Object],
		ref: 'Artist',
	},
	releaseDate: { type: Number },
	description: { type: String },
	mainArtist: { type: String, ref: 'Artist' },
	genreIds: {
		type: [String],
		ref: 'Genre',
	},
});

const AlbumModel = mongoose.model('Album', albumSchema);
module.exports = AlbumModel;
