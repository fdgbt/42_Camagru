const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Picture = require('../models/picture');

const deleteSessionsById = require('../utils/delSessions');
const deleteFile = require('../utils/deleteFile');

exports.getStatistics = async (req, res, next) => {
    try {

        const stats = {
            pictures: {
                posted: 0,
                likes: 0,
                comments: 0
            },
            users: {
                registered: 0,
                enabled: 0,
                last: "Unknown"
            },
            levels: {
                newbie: 0,
                bronze: 0,
                silver: 0,
                gold: 0,
                plat: 0,
                titan: 0,
                pall: 0,
                diamond: 0,
                anti: 0
            },
            roles: {
                admins: 0,
                modos: 0,
                bans: 0,
                users: 0,
            }
        }

        const pics = await Picture.fetchAll();

        pics.forEach(picture => {
            stats.pictures.posted++;
            stats.pictures.likes += picture.likes.length;
            stats.pictures.comments += picture.comments.length;
        });

        const users = await User.fetchAll();

        users.forEach(user => {
            stats.users.registered++;

            if (user.admin.enabled)
                stats.users.enabled++;
            stats.users.last = user.username;

            switch (user.admin.role) {
                case ("User"):
                    stats.roles.users++;
                    break;
                case ("Moderator"):
                    stats.roles.modos++;
                    break;
                case ("Administrator"):
                    stats.roles.admins++;
                    break;
                case ("Banned"):
                    stats.roles.bans++;
                    break;
            }

            switch (user.admin.level) {
                case ("Newbie"):
                    stats.levels.newbie++;
                    break;
                case ("Bronze"):
                    stats.levels.bronze++;
                    break;
                case ("Silver"):
                    stats.levels.silver++;
                    break;
                case ("Gold"):
                    stats.levels.gold++;
                    break;
                case ("Platinum"):
                    stats.levels.plat++;
                    break;
                case ("Titanium"):
                    stats.levels.titan++;
                    break;
                case ("Palladium"):
                    stats.levels.pall++;
                    break;
                case ("Diamond"):
                    stats.levels.diamond++;
                    break;
                case ("Antimatter"):
                    stats.levels.anti++;
                    break;
            }
        });

        res.status(200).render('admin/stats', {
            pageTitle: "Global Statistics",
            path: "admin-statistics",
            stats: stats
        });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        next(err);
    }
};

exports.getUsers = async (req, res, next) => {
    try {

        const users = await User.fetchAll();

        res.status(200).render('admin/users', {
            pageTitle: "Manage Members",
            path: "admin-users",
            users: users
        });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        next(err);
    }
};

exports.getUserSetting = async (req, res, next) => {
    try {

        const userId = req.params.userId;

        const user = await User.findById(userId);

        res.status(200).render('admin/editUser', {
            pageTitle: "Edit Member",
            path: "admin-setting",
            user: user
        });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        next(err);
    }
};

exports.postUserSetting = async (req, res, next) => {
    try {

        const userId = req.params.userId;
        const adminPwd = req.body.password;

        const userDoc = await User.findById(userId);

        if (!userDoc) {
            return res.status(404).json({ message: 'User not found in Database', input: "username", success: false });
        }

        const match = await bcrypt.compare(adminPwd, req.session.user.password);

        if (match) {

            const updatedAdmin = {
                date: userDoc.admin.date,
                role: req.body.role,
                level: req.body.level,
                enabled: (req.body.enabled === "true"),
            }

            const updatedUser = new User(req.body.email, req.body.username, userDoc.password, userDoc.prefs, updatedAdmin, userDoc._id);

            await updatedUser.save();

            await deleteSessionsById(userId);

            return res.status(200).json({ message: 'User edited successfully', success: true });

        } else {
            return res.status(403).json({ message: 'Incorrect Password', input: "password", success: false });
        }

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {

        const userId = req.params.userId;
        const adminPwd = req.body.password;

        const userDoc = await User.findById(userId);

        if (!userDoc) {
            return res.status(404).json({ message: 'User not found in Database', input: "username", success: false });
        }

        const match = await bcrypt.compare(adminPwd, req.session.user.password);

        if (match) {
            const pics = await Picture.fetchOwned(userId);

            await pics.forEach(async (picture) => {
                if (picture && picture.imgUrl.match(/https?:\/\//g) === null) {
                    deleteFile(picture.imgUrl, next);
                }
                await Picture.deleteById(picture._id);
            });

            await User.deleteById(userId);

            await deleteSessionsById(userId);

            res.status(200).json({ message: "User deleted successfully", success: true });

        } else {
            res.status(403).json({ message: "Incorrect Password", input: "password", success: false });
        }

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        next(err);
    }
}