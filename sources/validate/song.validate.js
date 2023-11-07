const Joi = require('joi');
const objectIdSchema = require('./objectId.validate');

// exports.createSong = (songData) => {
// 	const songSchema = Joi.object({
// 		name: Joi.string().min(3).max(255).required(),
// 		artist: Joi.string().min(3).max(255).required(),
// 		genre: Joi.string().min(3).max(255).required(),
// 		lyrics: Joi.string().min(3).max(255).required(),
// 	});

// 	return songSchema.validate(songData);
// };

exports.queryByGenreID = (genreId) => {
	const genreIDSchema = Joi.object({
		genreId: Joi.string().min(3).max(255).required(),
	});

	return genreIDSchema.validate(genreId);
};

exports.queryByArtist = (alias) => {
	const artistSchema = Joi.object({
		alias: Joi.string().min(3).max(255).required(),
	});

	return artistSchema.validate(alias);
};

exports.queryBySongID = (songId) => {
	const songIDSchema = Joi.object({
		songId: Joi.string().min(3).max(255).required(),
	});

	return songIDSchema.validate(songId);
};

exports.createNewReview = (data) => {
	const reviewSchema = Joi.object({
		review: Joi.string().min(3).max(255).required(),
		songId: Joi.string().min(3).max(255).required(),
		accountId: objectIdSchema,
	});

	return reviewSchema.validate(data);
};

exports.deleteReview = (data) => {
	const deleteReviewSchema = Joi.object({
		songId: Joi.string().min(3).max(255).required(),
		reviewId: Joi.string().min(3).max(255).required(),
		accountId: objectIdSchema,
	});

	return deleteReviewSchema.validate(data);
};

exports.replyReview = (data) => {
	const replyReviewSchema = Joi.object({
		reviewId: Joi.string().min(3).max(255).required(),
		reply: Joi.string().min(3).max(255).required(),
		songId: Joi.string().min(3).max(255).required(),
		accountId: objectIdSchema,
	});

	return replyReviewSchema.validate(data);
};

exports.updateReview = (data) => {
	const updateReviewSchema = Joi.object({
		reviewId: Joi.string().min(3).max(255).required(),
		review: Joi.string().min(3).max(255).required(),
		songId: Joi.string().min(3).max(255).required(),
		accountId: objectIdSchema,
	});

	console.log(updateReviewSchema.validate(data));
	return updateReviewSchema.validate(data);
};

exports.updateSong = (data) => {
	const updateSongSchema = Joi.object({
		songId: Joi.string().min(3).max(255).required(),
		name: Joi.string().min(3).max(255),
		genreIds: Joi.array().items(Joi.string().min(3).max(255)),
	});

	return updateSongSchema.validate(data);
};
