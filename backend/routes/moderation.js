const express = require('express');

const modoController = require('../controllers/moderation');

const isAuth = require('../middlewares/isAuth');
const isBan= require('../middlewares/isBan');
const isEnabled = require('../middlewares/isEnabled');
const isModo = require('../middlewares/isModo');
const urlencoded = require('../middlewares/urlencoded');

const router = express.Router();

const checkModo = require('../validations/managing');
const checkIndex = require('../validations/index');

router.get('/admin/gallery/:picId', isAuth, isBan, isEnabled, isModo, checkModo.picId, modoController.getAdminPicture);

router.delete('/admin/comment/:picId', isAuth, isBan, isEnabled, isModo, urlencoded, checkModo.picId, checkModo.comId, modoController.deleteAdminComment);
router.delete('/admin/picture/:picId', isAuth, isBan, isEnabled, isModo, checkModo.picId, modoController.deleteAdminPicture);

router.get('/admin/picture/user/:username', isAuth, isBan, isEnabled, isModo, checkIndex.username, modoController.getAdminUserPictures);

router.get('/admin/managing/:picId', isAuth, isBan, isEnabled, isModo, checkModo.picId, modoController.getAdminPictureSetting);
router.post('/admin/managing/:picId', isAuth, isBan, isEnabled, isModo, urlencoded, checkModo.picId, checkModo.title, checkModo.desc, checkModo.visibility , modoController.postAdminPictureSetting);

router.get('/admin/managing', isAuth, isBan, isEnabled, isModo, modoController.getAdminManaging);

module.exports = router;