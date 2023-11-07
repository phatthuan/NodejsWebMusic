const { getOne } = require('./factory.controller');
const lyricModel = require('../models/lyric.model');
const { AppError, catchAsync } = require('../utils');
const LyricModel = require('../models/lyric.model');

exports.getLyrics = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	console.log('🚀 ~ exports.getLyrics=catchAsync ~ id:', id);
	if (!id) return next(new AppError('Can not find lyrics for this song', 400));
	const lyrics = await LyricModel.findOne({ id });
	console.log('🚀 ~ exports.getLyrics=catchAsync ~ lyrics:', lyrics);
	if (!lyrics?.id) return next(new AppError('Can not find lyrics for this song', 400));
	res.status(200).json({
		status: 'success',
		data: lyrics,
	});
});
