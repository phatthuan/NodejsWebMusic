const express = require('express');
const { getAll } = require('../controllers/artist.controller');
const router = express.Router();

router.route('/').get(getAll);

module.exports = {
	artistRoutes: router,
};
