const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');
const { protectedRoutes, restrictTo } = require('../controllers/auth.controller');
const { ROLE } = require('../constants');

router.route('/:alias').get(genreController.getOne);

router
	.route('/')
	.get(genreController.getAll)
	.post(protectedRoutes, restrictTo([ROLE.ADMIN]), genreController.createOne);

module.exports = {
	genreRoutes: router,
};
