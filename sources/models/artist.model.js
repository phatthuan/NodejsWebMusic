const mongoose = require('mongoose');
const artistSchema = new mongoose.Schema(
	{
		id: { type: String, default: mongoose.Types.ObjectId },
		name: { type: String, required: true },
		link: { type: String, required: true },
		thumbnail: { type: String, required: true },
		alias: { type: String, required: true },
		realname: { type: String, required: true },
		national: { type: String, required: true },
		birthday: { type: String },
		totalFollower: { type: Number, default: 0 },
		accountId: { type: String, required: true, ref: 'Account' },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const ArtistModel = mongoose.model('Artist', artistSchema);
module.exports = ArtistModel;
