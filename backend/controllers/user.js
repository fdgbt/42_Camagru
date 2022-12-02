const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Picture = require('../models/picture');

const updateSettings = require('../utils/updateSettings');
const deleteFile = require('../utils/deleteFile');
const deleteSessionsById = require('../utils/delSessions');
const addToLogs = require('../utils/logs');
const sendMail = require('../utils/sendMail');

const delAccountMail = require('../mails/delAccount').getDelAccountMail;

exports.getAccount = (req, res, next) => {
  res.status(200).render('user/account', {
    pageTitle: "My Account",
    path: "account",
    user: req.session.user,
    role: req.session.user.admin.role
  });
};

exports.getStatistics = async (req, res, next) => {
  try {

    const pics = await Picture.fetchOwned(req.session.user._id);

    let picsNumber = 0;
    let likesNumber = 0;
    let commentsNumber = 0;

    pics.forEach(picture => {
      picsNumber++;
      likesNumber += picture.likes.length;
      commentsNumber += picture.comments.length;
    });

    res.status(200).render('user/stats', {
      pageTitle: "Account Statistics",
      path: "account-statistics",
      user: req.session.user,
      role: req.session.user.admin.role,
      picsNumber: picsNumber,
      likesNumber: likesNumber,
      commentsNumber: commentsNumber
    });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.getSettings = (req, res, next) => {
  res.status(200).render('user/settings', {
    pageTitle: "Account Settings",
    path: "account-settings",
    user: req.session.user
  });
};

exports.postSettings = async (req, res, next) => {

  try {

    const userId = req.session.user._id;
    const currentPwd = req.body.currentPassword;

    if (!userId) {
      return res.status(404).json({ message: 'UserId not found in Session', input: "email", success: false });
    }

    const userDoc = await User.findById(userId);

    if (!userDoc) {
      return res.status(404).json({ message: 'User account not found in Database', input: "email", success: false });
    }

    const match = await bcrypt.compare(currentPwd, userDoc.password);

    const updatedSettings = await updateSettings(match, userDoc, req.body);

    if (!updatedSettings.error) {

      const updatedUser = new User(
        updatedSettings.userDoc.email,
        updatedSettings.userDoc.username,
        updatedSettings.userDoc.password,
        updatedSettings.userDoc.prefs,
        updatedSettings.userDoc.admin,
        updatedSettings.userDoc._id);

      await updatedUser.save();

      req.session.user = updatedUser;

      await req.session.save();

      return res.status(200).json({ message: 'User\'s settings updated successfully', input: "email", success: true });

    } else if (updatedSettings.error === -1) {
      res.status(203).json({ message: 'Current Password is incorrect', input: 'currentPassword', success: false });
    } else if (updatedSettings.error === -2) {
      res.status(203).json({ message: 'This E-mail already exists', input: 'email', success: false });
    } else if (updatedSettings.error === -3) {
      res.status(203).json({ message: 'This Username already exists', input: 'username', success: false });
    }

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.postUserDelete = async (req, res, next) => {

  try {

    const userId = req.session.user._id;
    const currentPwd = req.body.currentPassword;

    if (!userId) {
      return res.status(403).json({ message: "UserId not found in Session", input: "username", success: true });
    }

    const userDoc = await User.findById(userId);

    if (!userDoc) {
      return res.status(404).json({ message: "User not found in Database", input: "username", success: true });
    }

    const match = await bcrypt.compare(currentPwd, userDoc.password);

    if (match) {
      const pics = await Picture.fetchOwned(userId);

      await pics.forEach(async (picture) => {
        if (picture && picture.imgUrl.match(/https?:\/\//g) === null) {
          deleteFile(picture.imgUrl, next);
        }
        await Picture.deleteById(picture._id);
      });

      await User.deleteById(userId);

      req.session.authenticated = false;

      await deleteSessionsById(userId);

      const mail = delAccountMail(userDoc.username);
      sendMail(userDoc.email, mail.subject, mail.html);

      addToLogs('USER INFO', 'Account deleted: ' + userDoc.email + '/' + userDoc.username);

      res.status(200).json({ message: "User deleted successfully", success: true });

    } else {
      res.status(403).json({ message: "Current password incorrect", input: "currentPassword", success: false });
    }

  } catch (err) {

    if (!err.httpStatusCode) {
      err.httpStatusCode = 500;
    }

    next(err);
  }
}
