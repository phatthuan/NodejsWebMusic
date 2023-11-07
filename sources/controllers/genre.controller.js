const genreModel = require('../models/genre.model');
const { catchAsync, AppError } = require('../utils');
const { getAll } = require('./factory.controller');
const validateGenre = require('../validate/genre.validate');

const { default: slugify } = require('slugify');
const { nanoid } = require('nanoid');
const GenreModel = require('../models/genre.model');

exports.getAll = getAll(genreModel);
exports.getOne = catchAsync(async (req, res, next) => {
	const { alias } = req.params;
	const genre = await GenreModel.findOne({ alias });
	if (!genre) {
		return next(new AppError('Genre not found', 404));
	}
	res.status(200).json({
		status: 200,
		data: genre,
	});
});

exports.createOne = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	const { error } = validateGenre.createOne({ name });

	if (error) {
		return next(new AppError(error.details[0].message, 400));
	}

	const alias = slugify(name, { lower: true, replacement: '-' });
	const isExist = await GenreModel.findOne({ alias });
	if (isExist) {
		return next(new AppError('Genre already exist', 400));
	}

	const uuid = nanoid(8);
	const link = '/genre/' + alias + '-' + uuid + '.html';
	const genre = await genreModel.create({ name, id: uuid, alias, title: name, link });
	res.status(201).json({
		status: 201,
		data: genre,
	});
});
