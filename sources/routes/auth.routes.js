const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { ROLE } = require('../constants');

router.get(
	'/accounts',
	authController.protectedRoutes,
	authController.restrictTo([ROLE.ADMIN]),
	authController.getAccounts
);
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/change-password', authController.protectedRoutes, authController.changePassword);
router.get('/me', authController.protectedRoutes, authController.getMe);
router
	.route('/locked')
	.get(
		authController.protectedRoutes,
		authController.restrictTo([ROLE.ADMIN]),
		authController.getLockedAccount
	);
router.patch(
	'/:id/locked',
	authController.protectedRoutes,
	authController.restrictTo([ROLE.ADMIN]),
	authController.toggleLockAccount
);

module.exports = {
	authRoutes: router,
};
