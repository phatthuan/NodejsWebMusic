const { AppError, catchAsync, QueryApi } = require('../utils/index');

exports.deleteOne = (Model) => {
	// currying function
	return catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(204).json({
			status: 'success',
			data: null,
		});
	});
};

exports.updateOne = (Model) => {
	return catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});
};

exports.createOne = (Model) => {
	return catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});
};

exports.getOne = (Model, popOptions = []) => {
	return catchAsync(async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if (popOptions) query = query.populate(popOptions);
		const doc = await query;

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});
};

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		const filter = {
			...req.query,
		};
		const queryApi = new QueryApi(Model.find(filter), req.query)
			.filter()
			.limitFields()
			.sort()
			.paginate();
		const doc = await queryApi.query;
		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: doc.length,
			data: {
				data: doc,
			},
		});
	});
