const mongoose = require('mongoose');
const zingMp3Api = require('../axios/zingmp3Api');
const songSchema = new mongoose.Schema(
	{
		id: { type: String, default: mongoose.Types.ObjectId },
		title: { type: String },
		link: { type: String },
		thumbnail: { type: String },
		artists: {
			type: [Object],
			ref: 'Artist',
		},
		album: {
			type: String,
			ref: 'Album',
		},
		genreIds: {
			type: [{ type: String, ref: 'Genre' }],
			ref: 'Genre',
		},
		duration: { type: Number },
		releaseDate: { type: Number, default: Date.now },
		mainArtist: { type: String, ref: 'Artist' },
		hasLyric: { type: Boolean, default: false },
		listen: { type: Number, default: 0 },
		like: { type: Number, default: 0 },
		timeUpdate: { type: Number },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

songSchema.virtual('genres', {
	ref: 'Genre',
	foreignField: 'id',
	localField: 'genreIds',
});

songSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'genreIds',
		select: 'id name',
		foreignField: 'id',
	});
	next();
});

songSchema.post(/^find/, function (docs, next) {
	const isArray = Array.isArray(docs);
	try {
		if (isArray) {
			(async () => {
				const songsNeedToUpdate = docs.map(async (doc) => {
					const { id, timeUpdate, title } = doc;
					const currentTime = new Date().getTime();
					const needToUpdate = currentTime - timeUpdate > 10 * 60 * 1000 || !timeUpdate;
					if (needToUpdate) {
						const newTimeUpdate = new Date().getTime();
						return zingMp3Api.getSong(id).then(async (res) => {
							if (res.err === 0) {
								const { data } = res;
								doc.link = data['128'];
								doc.timeUpdate = newTimeUpdate;
								await doc.save();
							}
						});
					}
				});
				await Promise.all(songsNeedToUpdate);
			})();
		} else {
			const { id, timeUpdate } = docs;
			const currentTime = new Date().getTime();
			// If timeUpdate is null or timeUpdate is more than 10 minutes ago
			const needToUpdate = currentTime - timeUpdate > 10 * 60 * 1000 || !timeUpdate;
			console.log('needToUpdate', needToUpdate);
			if (needToUpdate) {
				console.log('need to update');
				(async () => {
					const newTimeUpdate = new Date().getTime();
					zingMp3Api.getSong(id).then(async (res) => {
						console.log(res);
						if (res.err === 0) {
							const { data } = res;
							docs.link = data['128'];
							docs.timeUpdate = newTimeUpdate;
							await docs.save();
						}
					});
				})();
			}
		}
	} catch (err) {
		console.log(err);
	}
	next();
});

songSchema.index({
	releaseDate: -1,
});

songSchema.index({
	listen: -1,
	like: -1,
});

const SongModel = mongoose.model('Song', songSchema);
module.exports = SongModel;
