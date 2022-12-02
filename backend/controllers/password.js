const crypto = require("crypto");
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const sendMail = require('../utils/sendMail');

const resetPwdMail = require('../mails/resetPwd').getResetPwdMail;
const newPwdMail = require('../mails/newPwd').getNewPwdMail;

exports.getLostPwd = async (req, res, next) => {

  try {
    if (req.session.authenticated === true) {
      res.redirect('/settings')
    } else {
      res.status(200).render('user/lostPassword', {
        pageTitle: "Reset your password",
        path: "lostpassword"
      });
    }
  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
};

exports.postLostPwd = async (req, res, next) => {

  try {
    const email = req.body.email;

    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');

    const user = await User.find({ email: email });

    if (!user) {
      return res.status(404).json({ message: "No User found with this Email", input: "email", success: false });
    }

    if (user.admin.resetPwdToken && (user.admin.resetPwdTokenExpiration > Date.now())) {
      return res.status(403).json({ message: "You must wait 10 minutes from the last E-mail before you can send another one", input: "email", success: false });
    }

    const updatedUser = new User(user.email, user.username, user.password, user.prefs, user.admin, user._id);

    updatedUser.admin.resetPwdToken = token;
    updatedUser.admin.resetPwdTokenExpiration = Date.now() + 600000;

    await updatedUser.save();

    const mail = resetPwdMail(user.username, token);
    sendMail(user.email, mail.subject, mail.html);

    return res.status(200).json({ message: "Check your mailbox to reset your password", input: "email", success: true });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
};

exports.postResendPwdMail = async (req, res, next) => {

  try {
    const email = req.body.email;

    const user = await User.find({ email: email });

    if (!user) {
      return res.status(404).json({ message: "No User found with this Email", input: "email", success: false });
    }

    if (!user.admin.resetPwdToken || !user.admin.resetPwdTokenExpiration)
      return res.status(500).json({ message: "Your account does not have an activation token", input: "email", success: false });

    if (user.admin.resetPwdTokenExpiration < Date.now()) {

      const buffer = crypto.randomBytes(32);
      const token = buffer.toString('hex');

      const updatedUser = new User(user.email, user.username, user.password, user.prefs, user.admin, user._id);

      updatedUser.admin.resetPwdToken = token;
      updatedUser.admin.resetPwdTokenExpiration = Date.now() + 600000;

      await updatedUser.save();

      const mail = resetPwdMail(user.username, token);
      sendMail(user.email, mail.subject, mail.html);

      return res.status(200).json({ message: "The E-mail to reset your password has been sent again.", input: "email", success: true });

    } else {
      return res.status(403).json({ message: "You must wait 10 minutes from the last E-mail before you can send another one.", input: "email", success: false });
    }
  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.getResetPwd = async (req, res, next) => {

  try {
    const token = req.params.token;

    const user = await User.find({ "admin.resetPwdToken": token });

    if (!token || !user || !user.admin.resetPwdToken || !user.admin.resetPwdTokenExpiration) {

      return res.status(404).render('error/404', {
        pageTitle: "Invalid Token",
        path: "404"
      });

    } else if (user.admin.resetPwdTokenExpiration < Date.now()) {

      return res.status(403).render('error/403', {
        pageTitle: "Token Expired",
        path: "403"
      });

    } else {

      res.status(200).render('user/resetPassword', {
        pageTitle: "Set a new password",
        path: "resetpassword",
        pwdToken: token
      });
    }

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
};

exports.postResetPwd = async (req, res, next) => {

  try {

    const newPassword = req.body.password;
    const passwordToken = req.body.token;

    const user = await User.find({ "admin.resetPwdToken": passwordToken });

    if (!user || !user.admin.resetPwdTokenExpiration) {
      return res.status(404).json({ message: "User not found", input: "token", success: false });
    } else if (user.admin.resetPwdTokenExpiration < Date.now()) {

      return res.status(403).json({ message: "Token has expired", input: "token", success: false });

    } else {

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      delete user.admin.resetPwdToken;
      delete user.admin.resetPwdTokenExpiration;

      const updatedUser = new User(user.email, user.username, hashedPassword, user.prefs, user.admin, user._id);

      await updatedUser.save();

      req.session.authenticated = true;
      req.session.user = updatedUser;

      await req.session.save();

      const mail = newPwdMail(user.username);
      sendMail(user.email, mail.subject, mail.html);

      return res.status(200).json({ message: "Password updated successfully", input: "password", success: true });
    }

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
};
