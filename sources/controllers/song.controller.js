const { getAll, getOne } = require('./factory.controller');
const SongModel = require('../models/song.model');
const { catchAsync, AppError, QueryApi } = require('../utils');
const validateSong = require('../validate/song.validate');
const GenreModel = require('../models/genre.model');

exports.getAll = getAll(SongModel);
exports.getOne = getOne(SongModel);

exports.getTop = (limit = 10) => {
	return catchAsync(async (req, res, next) => {
		const songs = await SongModel.aggregate([
			{
				$sort: {
					listen: -1,
					like: -1,
				},
			},
			{
				$limit: limit,
			},
		]);
		res.status(200).json({
			status: 'success',
			data: songs,
		});
	});
};

exports.getByGenre = catchAsync(async (req, res, next) => {
	const { genreId } = req.query;
	const { error } = validateSong.queryByGenreID({ genreId });
	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const queryApi = new QueryApi(
		SongModel.find({
			genreIds: {
				$in: [genreId],
			},
		}),
		req.query
	)
		.filter()
		.limitFields()
		.sort()
		.paginate();
	const docs = await queryApi.query;

	res.status(200).json({
		status: 'success',
		data: docs,
	});
});

exports.getByArtist = catchAsync(async (req, res, next) => {
	const { alias } = req.query;
	const { error } = validateSong.queryByArtist({ alias });
	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const queryApi = new QueryApi(
		SongModel.find({
			artists: {
				$elemMatch: {
					alias,
				},
			},
		}),
		req.query
	)
		.filter()
		.limitFields()
		.sort()
		.paginate();
	const docs = await queryApi.query;

	res.status(200).json({
		status: 'success',
		data: docs,
	});
});

exports.updateSong = catchAsync(async (req, res, next) => {
	const songId = req.params.id;
	const { name, genreIds } = req.body;
	const { error } = validateSong.updateSong({
		songId,
		name,
		genreIds,
	});

	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const song = await SongModel.findOne({ _id: songId });

	if (!song) {
		return next(new AppError('Song not found', 404));
	}

	song.title = name || song.title;
	console.log('🚀 ~ exports.updateSong=catchAsync ~ song:', song);
	if (genreIds) {
		const checkIsExistGenre = await GenreModel.findOne({
			id: {
				$in: genreIds,
			},
		});

		if (!checkIsExistGenre) {
			return next(new AppError('Genre not found', 404));
		}

		song.genreIds = genreIds;
	}
	await song.save();

	res.status(200).json({
		status: 'success',
		data: song,
	});
});
