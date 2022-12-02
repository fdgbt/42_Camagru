const express = require('express');

const userController = require('../controllers/user');

const isAuth = require('../middlewares/isAuth');
const isBan = require('../middlewares/isBan');
const isEnabled = require('../middlewares/isEnabled');
const urlencoded = require('../middlewares/urlencoded');

const checkAuth = require('../validations/auth');
const checkSettings = require('../validations/settings');

const router = express.Router();

router.get('/account', isAuth, isBan, isEnabled, userController.getAccount);

router.get('/statistics', isAuth, isBan, isEnabled, userController.getStatistics);

router.get('/settings', isAuth, isBan, isEnabled, userController.getSettings);

router.post('/settings', isAuth, isBan, isEnabled, urlencoded, checkAuth.email, checkAuth.username, checkSettings.newPwd, checkSettings.currentPwd, checkSettings.prefs, userController.postSettings);

router.post('/delete/user', isAuth, isBan, isEnabled, urlencoded, checkSettings.currentPwd, userController.postUserDelete);

module.exports = router;