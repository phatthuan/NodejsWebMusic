const RatingModel = require('../models/rating.model');
const ReviewModel = require('../models/review.model');
const { QueryApi, catchAsync, AppError } = require('../utils');
const validateSong = require('../validate/song.validate');

exports.getReviewsBySongId = catchAsync(async (req, res) => {
	const { id } = req.params;
	const { error } = validateSong.queryBySongID({ songId: id });
	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const queryApi = new QueryApi(ReviewModel.find({ song: id, parentReview: null }), req.query)
		.filter()
		.limitFields()
		.sort()
		.paginate();
	const docs = await queryApi.query.populate('account', 'name').populate('replies');

	res.status(200).json({
		status: 'success',
		data: docs,
	});
});

exports.createReview = catchAsync(async (req, res, next) => {
	const { review } = req.body;
	const { id } = req.params;
	const { _id: accountId } = req.session.user;

	const { error } = validateSong.createNewReview({ review, songId: id, accountId });

	if (error) {
		console.log(error);
		return next(new AppError(error.details[0].message, 400));
	}

	const newReview = await ReviewModel.create({
		review,
		song: id,
		account: accountId,
	});

	res.status(201).json({
		status: 'success',
		data: newReview,
	});
});

exports.deleteReview = catchAsync(async (req, res, next) => {
	const { id: songId } = req.params;
	const { _id: accountId } = req.session.user;
	const { reviewId } = req.body;

	const { error } = validateSong.deleteReview({ songId, accountId, reviewId });

	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const reviewToBeDelete = await ReviewModel.findOne({ _id: reviewId, song: songId });
	console.log('🚀 ~ exports.deleteReview ~ reviewToBeDelete:', reviewToBeDelete);

	if (!reviewToBeDelete) {
		return next(new AppError('Review not found, cannot delete', 400));
	}

	if (reviewToBeDelete.account.toString() !== accountId.toString()) {
		console.log('🚀 ~ exports.deleteReview ~ reviewToBeDelete:', reviewToBeDelete);
		console.log('🚀 ~ exports.deleteReview ~ accountId:', accountId);
		return next(new AppError('You are not the owner of this review, cannot delete', 400));
	}

	const parentReview = reviewToBeDelete.parentReview;
	console.log('🚀 ~ exports.deleteReview ~ parentReview:', parentReview);
	if (parentReview) {
		const parentReviewInDb = await ReviewModel.findOne({ _id: parentReview });
		if (!parentReviewInDb) return next(new AppError('Parent review not found, cannot delete', 400));
		parentReviewInDb.replies = parentReviewInDb.replies.filter(
			(reply) => reply.toString() !== reviewToBeDelete._id.toString()
		);
		await parentReviewInDb.save();
	}

	await reviewToBeDelete.remove();

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.updateReview = catchAsync(async (req, res, next) => {
	const { id: songId } = req.params;
	const { _id: accountId } = req.session.user;
	const { reviewId, review } = req.body;
	console.log('🚀 ~ exports.updateReview=catchAsync ~ review:', review);

	const { error } = validateSong.updateReview({ songId, accountId, reviewId, review });
	console.log('🚀 ~ exports.updateReview=catchAsync ~ error:', error);

	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const reviewToBeUpdate = await ReviewModel.findOne({ _id: reviewId, song: songId });

	if (!reviewToBeUpdate) {
		return next(new AppError('Review not found, cannot update', 400));
	}

	if (reviewToBeUpdate.account.toString() !== accountId.toString()) {
		return next(new AppError('You are not the owner of this review, cannot update', 400));
	}

	reviewToBeUpdate.review = review;

	await reviewToBeUpdate.save();

	res.status(200).json({
		status: 'success',
		data: reviewToBeUpdate,
	});
});

exports.replyReview = catchAsync(async (req, res, next) => {
	const { id: songId } = req.params;
	const { _id: accountId } = req.session.user;

	const { reviewId, reply } = req.body;

	const { error } = validateSong.replyReview({ songId, accountId, reviewId, reply });

	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const existParentReview = await ReviewModel.findOne({ _id: reviewId, song: songId });

	if (!existParentReview) {
		return next(new AppError('Review not found, cannot reply', 400));
	}

	const review = new ReviewModel({
		review: reply,
		song: songId,
		account: accountId,
		parentReview: reviewId,
	});

	await review.save();

	res.status(201).json({
		status: 'success',
		data: review,
	});
});

exports.checkHasLiked = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { error } = validateSong.queryBySongID({ songId: id });
	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const { _id: accountId } = req.session.user;

	const rating = await RatingModel.findOne({ song: id, account: accountId });

	const hasLiked = !!rating?.isLiked;

	res.status(200).json({
		status: 'success',
		data: hasLiked,
	});
});

exports.toggleLike = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { error } = validateSong.queryBySongID({ songId: id });
	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const { _id: accountId } = req.session.user;

	const rating = await RatingModel.findOne({ song: id, account: accountId });

	if (rating) {
		rating.isLiked = !rating.isLiked;
		await rating.save();

		res.status(200).json({
			status: 'success',
			data: rating,
		});
	} else {
		const newRating = new RatingModel({
			isLiked: true,
			song: id,
			account: accountId,
		});

		await newRating.save();

		res.status(201).json({
			status: 'success',
			data: newRating,
		});
	}
});
