const express = require('express');

const manageController = require('../controllers/managing');

const isAuth = require('../middlewares/isAuth');
const isBan= require('../middlewares/isBan');
const isEnabled = require('../middlewares/isEnabled');
const urlencoded = require('../middlewares/urlencoded');

const check = require('../validations/managing');

const router = express.Router();

router.get('/managing/:picId', isAuth, isBan, isEnabled, check.picId, manageController.getPictureSetting);

router.post('/managing/:picId', isAuth, isBan, isEnabled, urlencoded, check.picId, check.title, check.desc, check.visibility, manageController.postPictureSetting);

router.get('/managing', isAuth, isBan, isEnabled, manageController.getManaging);

router.delete('/picture/:picId', isAuth, isBan, isEnabled, check.picId, manageController.deletePicture);

router.put('/like/:picId', isAuth, isBan, isEnabled, check.picId, manageController.likePicture);

router.put('/comment/:picId', isAuth, isBan, isEnabled, urlencoded, check.picId, check.commentMsg, manageController.commentPicture);

router.delete('/comment/:picId', isAuth, isBan, isEnabled, urlencoded, check.picId, check.comId, manageController.deleteComment);

module.exports = router;