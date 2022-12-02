const crypto = require("crypto");
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const addToLogs = require('../utils/logs');
const sendMail = require('../utils/sendMail');

const signUpMail = require('../mails/signup').getSignUpMail;

exports.getSignup = (req, res, next) => {
  if (req.session.authenticated) {
    res.status(200).redirect('/')

  } else {
    res.status(200).render('signup', {
      pageTitle: "Sign Up",
      path: "signup",
    });
  }
};

exports.postSignup = async (req, res, next) => {
  try {

    const email = req.body.email.trim();
    const username = req.body.username.replace(/\s/g, "")
    const password = req.body.password;

    const userDocEmail = await User.find({ email: email });

    if (userDocEmail) {
      return res.status(409).json({ message: "This E-mail is already used", input: "email", success: false });
    }

    const userDocName = await User.find({ username: username });

    if (userDocName) {
      return res.status(409).json({ message: "This Username is already used", input: "username", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const prefs = {
      comsMail: true,
      likesMail: false,
      levelsMail: false,
      visibility: "public"
    };
    const admin = {
      date: new Date(),
      role: "User",
      level: "Newbie",
      enabled: false,
    };

    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');

    const newUser = new User(email, username, hashedPassword, prefs, admin, null);

    newUser.admin.activationToken = token;
    newUser.admin.activationTokenExpiration = Date.now() + 600000;

    await newUser.save();

    const mail = signUpMail(username, token);
    sendMail(email, mail.subject, mail.html);

    req.session.authenticated = true;
    req.session.user = newUser;

    await req.session.save();

    addToLogs('USER INFO', 'Account created: ' + email + '/' + username);

    return res.status(201).json({ message: "User account created successfully", input: "email", success: true });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
};

exports.getActivateUser = async (req, res, next) => {
  try {

    const token = req.params.token;

    const user = await User.find({ "admin.activationToken": token });

    if (!token || !user || !user.admin.activationToken || !user.admin.activationTokenExpiration) {

      return res.status(404).render('error/404', {
        pageTitle: "Invalid Token",
        path: "404"
      });

    } else if (user.admin.activationTokenExpiration < Date.now()) {

      return res.status(403).render('error/403', {
        pageTitle: "Token Expired",
        path: "403"
      });

    } else {

      const admin = {
        date: user.admin.date,
        role: user.admin.role,
        level: user.admin.level,
        enabled: true
      };

      const updatedUser = new User(user.email, user.username, user.password, user.prefs, admin, user._id);

      await updatedUser.save();

      req.session.authenticated = true;
      req.session.user = updatedUser;
      await req.session.save();

      return res.redirect('/editing');
    }

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
};

exports.postResendActivationMail = async (req, res, next) => {
  try {

    const user = req.session.user;

    if (!user)
      return res.status(404).json({ message: "User not found", success: false });

    if (user.admin.enabled)
      return res.status(403).json({ message: "Your account is already enabled", success: false });

    if (!user.admin.activationToken || !user.admin.activationTokenExpiration)
      return res.status(500).json({ message: "Your account does not have activation token", success: false });

    if (user.admin.activationTokenExpiration < Date.now()) {

      const buffer = await crypto.randomBytes(32);
      const token = buffer.toString('hex');

      const updatedUser = new User(user.email, user.username, user.password, user.prefs, user.admin, user._id);

      updatedUser.admin.activationToken = token;
      updatedUser.admin.activationTokenExpiration = Date.now() + 600000;

      await updatedUser.save();

      const mail = signUpMail(user.username, token);
      sendMail(user.email, mail.subject, mail.html);

      req.session.user = updatedUser;

      await req.session.save();

      return res.status(200).json({ message: "Activation E-mail has been sent successfully", success: true });
    } else {
      return res.status(403).json({ message: "You must wait 10 minutes from the last E-mail before you can send another one", success: false });
    }
  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.getLogin = (req, res, next) => {
  if (req.session.authenticated) {
    res.status(200).redirect('/')

  } else {
    res.status(200).render('login', {
      pageTitle: "Login",
      path: "login"
    });
  }
};

exports.postLogin = async (req, res, next) => {
  try {

    const username = req.body.username;
    const password = req.body.password;

    const userDoc = await User.find({ username: username });

    if (!userDoc) {
      return res.status(403).json({ message: "This Username does not exist", input: "username", success: false });
    }

    const match = await bcrypt.compare(password, userDoc.password);

    if (match) {

      req.session.authenticated = true;
      req.session.user = userDoc;

      req.session.save((err) => {
        if (err)
          addToLogs('ERROR', err);
      });

    } else {
      return res.status(403).json({ message: "Incorrect Password", input: "password", success: false });
    }

    addToLogs('USER INFO', 'Account connected: ' + username);

    return res.status(200).json({ message: "User " + userDoc.username + " authenticated successfully.", success: true });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.postLogout = async (req, res, next) => {
  try {

    const username = req.session.user.username;

    req.session.authenticated = false;
    req.session.destroy(err => {
      if (err) {
        const error = new Error(err);

        error.httpStatusCode = 500;
        throw error;
      }

      addToLogs('USER INFO', 'Account disconnected: ' + username);

      return res.status(200).json({ message: "User " + username + " disconnected successfully.", success: true });
    });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}
