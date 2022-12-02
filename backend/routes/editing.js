const express = require('express');

const editController = require('../controllers/editing');

const isAuth = require('../middlewares/isAuth');
const isBan= require('../middlewares/isBan');
const isEnabled = require('../middlewares/isEnabled');
const multer = require('../middlewares/multer');
const urlencoded = require('../middlewares/urlencoded');
const raw = require('../middlewares/raw');

const check = require('../validations/editing');

const router = express.Router();

router.get('/editing', isAuth, isBan, isEnabled, editController.getEditing);

router.post('/editing/cam', isAuth, isBan, isEnabled, raw, check.camEffects, check.special, editController.postEditing);

router.post('/editing/file', isAuth, isBan, isEnabled, multer, check.uploadEffects, check.special, editController.postEditingFile);

router.post('/editing/link', isAuth, isBan, isEnabled, urlencoded, check.link, check.uploadEffects, check.special, editController.postEditingLink);

module.exports = router;