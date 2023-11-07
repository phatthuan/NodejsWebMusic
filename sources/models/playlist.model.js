const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
	id: { type: String, default: mongoose.Types.ObjectId },
	title: { type: String, required: true },
	link: { type: String, required: true },
	createdAt: { type: String, required: true },
	userId: { type: String, required: true, ref: 'User' },
});

const PlaylistModel = mongoose.model('Playlist', playlistSchema);
module.exports = PlaylistModel;
