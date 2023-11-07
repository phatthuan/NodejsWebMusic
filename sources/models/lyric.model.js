const mongoose = require('mongoose');
const lyricSchema = new mongoose.Schema({
	id: { type: String, default: mongoose.Types.ObjectId, unique: true },
	file: { type: String },
	lyric: { type: String },
});

const LyricModel = mongoose.model('Lyric', lyricSchema);
module.exports = LyricModel;
