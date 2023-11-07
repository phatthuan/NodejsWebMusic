const express = require('express');
const router = express.Router();

const songController = require('../controllers/song.controller');
const lyricsController = require('../controllers/lyric.controller');
const reviewController = require('../controllers/review.controller');
const authController = require('../controllers/auth.controller');
const { ROLE } = require('../constants');

router.get('/top10', songController.getTop(10));
router.get('/top100', songController.getTop(100));
router.get('/genre', songController.getByGenre);
router.get('/artist', songController.getByArtist);
router.get('/:id/lyrics', lyricsController.getLyrics);
router
	.route('/:id/reviews')
	.get(reviewController.getReviewsBySongId)
	.post(authController.protectedRoutes, reviewController.createReview)
	.delete(authController.protectedRoutes, reviewController.deleteReview)
	.patch(authController.protectedRoutes, reviewController.updateReview);

router.post('/:id/reviews/reply', authController.protectedRoutes, reviewController.replyReview);
router
	.route('/:id/like')
	.get(authController.protectedRoutes, reviewController.checkHasLiked)
	.patch(authController.protectedRoutes, reviewController.toggleLike);

router
	.route('/:id')
	.get(songController.getOne)
	.patch(
		authController.protectedRoutes,
		authController.restrictTo([ROLE.ADMIN]),
		songController.updateSong
	);
router.route('/').get(songController.getAll);

module.exports = {
	songRoutes: router,
};
