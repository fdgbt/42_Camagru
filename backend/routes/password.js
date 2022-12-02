const express = require('express');

const pwdController = require('../controllers/password');

const urlencoded = require('../middlewares/urlencoded');

const checkAuth = require('../validations/auth');

const router = express.Router();

router.get('/login/lost', pwdController.getLostPwd);

router.post('/login/lost', urlencoded, checkAuth.email, pwdController.postLostPwd);

router.post('/login/mail', urlencoded, checkAuth.email, pwdController.postResendPwdMail);

router.get('/login/reset/:token', checkAuth.token, pwdController.getResetPwd);

router.post('/login/reset', urlencoded, checkAuth.token, checkAuth.password, pwdController.postResetPwd);

module.exports = router;