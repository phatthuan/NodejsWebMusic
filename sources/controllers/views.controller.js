const catchAsync = require('../utils/catchAsync');

exports.getHomePage = catchAsync(async (req, res, next) => {
	res.status(200).render('home', {
		title: 'Welcome to the home page',
	});
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
	res.status(200).render('login');
});

exports.getAdminUserManager = catchAsync(async (req, res, next) => {
	res.status(200).render('adminQLTaiKhoan');
});

exports.getAdminCommentManager = catchAsync(async (req, res, next) => {
	res.status(200).render('adminQLBinhLuan');
});

exports.getAdminSongManager = catchAsync(async (req, res, next) => {
	res.status(200).render('adminQLBaiHat');
});

exports.getAdminCategoryManager = catchAsync(async (req, res, next) => {
	res.status(200).render('adminQLChuyenMuc');
});

exports.getAdminTopSongManager = catchAsync(async (req, res, next) => {
	res.status(200).render('adminQLTopBaiHat');
});

