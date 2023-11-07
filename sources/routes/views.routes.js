const express = require('express');
const viewsController = require('../controllers/views.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/', viewsController.getHomePage);

router.get('/login', viewsController.getLoginPage)

router.get('/admin/comment', viewsController.getAdminCommentManager)

router.get('/admin/music', viewsController.getAdminSongManager)

router.get('/admin/category', viewsController.getAdminCategoryManager)

router.get('/admin/account', viewsController.getAdminUserManager)

router.get('/admin/top', viewsController.getAdminTopSongManager)

router.get('/binhluan',(req, res)=>{
    res.render('homeBinhLuan')
})

module.exports = {
    viewsRoutes: router,
};
