const express = require('express');

const indexController = require('../controllers/index');
const contactController = require('../controllers/contact');

const isAuth = require('../middlewares/isAuth');
const isBan= require('../middlewares/isBan');
const isEnabled = require('../middlewares/isEnabled');
const urlencoded = require('../middlewares/urlencoded');

const checkIndex = require('../validations/index');
const checkAuth = require('../validations/auth');
const checkContact = require('../validations/contact');

const router = express.Router();

router.get('/gallery/user/:username', isAuth, isBan, isEnabled, checkIndex.username, indexController.getUserPictures);

router.get('/gallery/:picId', isAuth, isBan, isEnabled, checkIndex.picId, indexController.getPicture);

router.patch('/gallery/page/:page', isBan, checkIndex.page, indexController.getMorePicture);

router.get('/gallery', isBan, checkIndex.page, indexController.getIndex);

router.get('/home', isBan, checkIndex.page, indexController.getIndex);

router.get('/index', isBan, checkIndex.page, indexController.getIndex);

router.get('/contact', contactController.getContact);

router.post('/contact', urlencoded, checkAuth.email, checkContact.subject, checkContact.message, contactController.postContact);

router.get('/', isBan, checkIndex.page, indexController.getIndex);

module.exports = router;