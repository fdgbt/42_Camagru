const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/user');

const sendMail = require('../utils/sendMail');
const signUpMail = require('../mails/signup').getSignUpMail;

const updateMail = async (userDoc, email) => {
    if (email !== userDoc.email) {

        const emailExists = await User.find({ email: email });

        if (emailExists) {
            return false;
        } else {
            userDoc.email = email;
            userDoc.admin.enabled = false;

            const buffer = crypto.randomBytes(32);
            const token = buffer.toString('hex');
            
            userDoc.admin.activationToken = token;
            userDoc.admin.activationTokenExpiration = Date.now() + 600000;

            const mail = signUpMail(userDoc.username, token);
            sendMail(userDoc.email, mail.subject, mail.html);
        }
    }
    return userDoc;
}

const updateUsername = async (userDoc, username) => {
    if (username !== userDoc.username) {

        const usernameExists = await User.find({ username: username });

        if (usernameExists) {
            return false;
        } else {
            userDoc.username = username;
        }
    }
    return userDoc;
}

const updatePassword = async (userDoc, newPwd) => {
    if (newPwd) {

        const hashedPwd = await bcrypt.hash(newPwd, 12);

        userDoc.password = hashedPwd;
    }
    return userDoc;
}

const updatePrefs = async (userDoc, comsMail, likesMail, levelsMail, visibility) => {
    const updatedPrefs = {
        comsMail: (comsMail === 'true'),
        likesMail: (likesMail === 'true'),
        levelsMail: (levelsMail === 'true'),
        visibility: visibility
    }

    userDoc.prefs = updatedPrefs;

    return userDoc;
}

const updateSettings = async (match, userDoc, body, res) => {

    const mail = body.email;
    const username = body.username;
    const newPwd = body.password;
    const comsMail = body.comsMail;
    const likesMail = body.likesMail;
    const levelsMail = body.levelsMail;
    const visibility = body.visibility;

    const result = {
        userDoc: null,
        error: 0
    }

    if (match) {

        userDoc = await updateMail(userDoc, mail);
        if (!userDoc) {
            result.error = -2;
            return result;
        }

        userDoc = await updateUsername(userDoc, username);
        if (!userDoc) {
            result.error = -3;
            return result;
        }

        userDoc = await updatePassword(userDoc, newPwd);

        userDoc = await updatePrefs(userDoc, comsMail, likesMail, levelsMail, visibility);

        result.userDoc = userDoc;
        return result;


    } else {
        result.error = -1;
        return result;;
    }
}

module.exports = updateSettings;