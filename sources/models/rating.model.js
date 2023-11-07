const mongoose = require('mongoose');
const SongModel = require('./song.model');

const ratingSchema = new mongoose.Schema(
	{
		isLiked: {
			type: Boolean,
			required: [true, 'Rating must have a value'],
		},
		account: {
			type: mongoose.Schema.ObjectId,
			ref: 'Account',
			required: [true, 'Rating must belong to a user'],
		},
		song: {
			type: mongoose.Schema.ObjectId,
			ref: 'Song',
			required: [true, 'Rating must belong to a song'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

ratingSchema.index({ account: 1, song: 1 }, { unique: true });

ratingSchema.methods.calculateTotalLikes = async function () {
	const stats = await this.model('Rating').aggregate([
		{
			$match: { song: this.song },
		},
		{
			$group: {
				_id: '$song',
				totalLikes: { $sum: { $cond: [{ $eq: ['$isLiked', true] }, 0, 1] } },
			},
		},
	]);
	console.log('🚀 ~ stats:', stats);

	if (stats.length > 0 && stats[0].totalLikes === 1) {
		const song = await SongModel.findOne({ _id: this.song });
		song.like = song.like + stats[0].totalLikes;
		await song.save();
		return;
	}

	if (stats.length > 0 && stats[0].totalLikes === 0) {
		const song = await SongModel.findOne({ _id: this.song });
		song.like = song.like > 0 ? song.like - stats[0].totalLikes : 0;
		await song.save();
		return;
	}
};

ratingSchema.pre('save', async function (next) {
	await this.calculateTotalLikes();
	next();
});

const RatingModel = mongoose.model('Rating', ratingSchema);

module.exports = RatingModel;
