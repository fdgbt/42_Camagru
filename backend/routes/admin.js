const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middlewares/isAuth');
const isBan= require('../middlewares/isBan');
const isEnabled = require('../middlewares/isEnabled');
const isAdmin = require('../middlewares/isAdmin');
const urlencoded = require('../middlewares/urlencoded');

const check = require('../validations/admin');
const checkAuth = require('../validations/auth');

const router = express.Router();

router.get('/admin/users', isAuth, isBan, isEnabled, isAdmin, adminController.getUsers);

router.get('/admin/statistics', isAuth, isBan, isEnabled, isAdmin, adminController.getStatistics);

router.get('/admin/user/:userId', isAuth, isBan, isEnabled, isAdmin, check.userId, adminController.getUserSetting);

router.post('/admin/user/:userId', isAuth, isBan, isEnabled, isAdmin, urlencoded, check.userId, checkAuth.email, checkAuth.username, check.enabled, check.level, check.role, check.password, adminController.postUserSetting);

router.delete('/admin/delete/:userId', isAuth, isBan, isEnabled, isAdmin, urlencoded, check.userId, check.password, adminController.deleteUser);

module.exports = router;