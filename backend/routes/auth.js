const express = require('express');

const authController = require('../controllers/auth');

const isAuth = require('../middlewares/isAuth');
const isBan = require('../middlewares/isBan');
const urlencoded = require('../middlewares/urlencoded');

const checkAuth = require('../validations/auth');

const router = express.Router();

router.get('/signup', authController.getSignup);

router.get('/signup/:token', checkAuth.token, authController.getActivateUser);

router.post('/signup/mail', isAuth, isBan, authController.postResendActivationMail);

router.post('/signup', urlencoded, checkAuth.email, checkAuth.username, checkAuth.password, authController.postSignup);

router.get('/login', authController.getLogin);

router.post('/login', urlencoded, checkAuth.username, checkAuth.password, authController.postLogin);

router.post('/logout', isAuth, authController.postLogout);

module.exports = router;