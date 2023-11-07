const express = require('express');
const router = express.Router();

const { viewsRoutes } = require('./views.routes');
const { authRoutes } = require('./auth.routes');
const { songRoutes } = require('./song.routes');
const { genreRoutes } = require('./genre.routes');
const { artistRoutes } = require('./artist.routes');
const { protectedRoutes, restrictTo } = require('../controllers/auth.controller');
const { ROLE } = require('../constants');

router.use('/', viewsRoutes);
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/genres', genreRoutes);
router.use('/api/v1/artists', artistRoutes);
router.use('/api/v1/songs', songRoutes);

module.exports = {
	rootRouter: router,
};
