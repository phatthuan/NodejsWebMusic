const artistModel = require('../models/artist.model');
const { getAll } = require('./factory.controller');

exports.getAll = getAll(artistModel);
