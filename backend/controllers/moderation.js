const ObjectId = require('mongodb').ObjectId

const User = require('../models/user');
const Picture = require('../models/picture');

const getPicture = require('../utils/picture');
const deleteFile = require('../utils/deleteFile');

exports.getAdminManaging = async (req, res, next) => {
    try {

        const pics = await Picture.fetchAll();

        res.status(200).render('admin/userPicture', {
            pageTitle: "Admin Gallery",
            path: "admin-managing",
            pictures: pics,
        });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        return next(err);
    }
};

exports.getAdminPicture = async (req, res, next) => {
    try {

        const picId = req.params.picId;

        if (!ObjectId.isValid(picId)) {
            return res.status(404).render('error/404', {
                pageTitle: "Picture Not Found",
                path: "404"
            });
        }

        const users = await User.fetchAll();
        const picture = await Picture.findById(picId);

        if (!picture) {
            return res.status(404).render('error/404', {
                pageTitle: "Picture Not Found",
                path: "404"
            });
        }

        picture.comments.forEach(comment => {
            users.every((user) => {
                if (comment.userId.toString() === user._id.toString()) {
                    comment.username = user.username;
                    return false;
                }
                return true;
            })
            if (!comment.username) {
                comment.username = "Anonymized";
            }
        });

        let picOwner;

        users.every(user => {
            if (picture.userId.toString() === user._id.toString()) {
                picOwner = user.username;
                return false;
            }
            return true;
        });

        res.status(200).render('admin/pictureDetail', {
            pageTitle: picture.title,
            path: "picture-detail",
            picture: picture,
            owner: picOwner,
            user: req.session.user
        })

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        return next(err);
    }
}

exports.deleteAdminPicture = async (req, res, next) => {

    try {

        const picId = req.params.picId;

        const picture = await Picture.findById(picId);

        if (!picture) {
            return res.status(404).json({ message: 'Picture not found in Database', success: false });
        }

        if (picture && picture.imgUrl.match(/https?:\/\//g) === null)
            deleteFile(picture.imgUrl, next);

        await Picture.deleteById(picId);

        return res.status(200).json({ message: 'Picture deleted successfully', success: true });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        return next(err);
    }
}

exports.deleteAdminComment = async (req, res, next) => {

    try {

        const picId = req.params.picId;
        const comId = req.body.comId;

        const picture = await Picture.findById(picId);

        if (!picture) {
            return res.status(404).json({ message: 'Picture not found in Database', success: false });
        }

        const newComments = picture.comments.filter(com => com._id != comId);

        const updatedPic = new Picture(
            picture.title,
            picture.description,
            picture.date,
            picture.imgUrl,
            picture.likes,
            newComments,
            picture.visible,
            picture.userId,
            picture._id
        );

        await updatedPic.save();

        res.status(200).json({ message: 'Comment deleted successfully', comments: updatedPic.comments, success: true });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        next(err);
    }
}

exports.getAdminPictureSetting = async (req, res, next) => {
    try {

        const picId = req.params.picId;

        const picture = await Picture.findById(picId);

        if (!picture) {
            res.redirect('/managing');
        }

        res.status(200).render('picture/settings', {
            pageTitle: "Edit the picture",
            path: "picture-setting",
            admin: "/admin",
            picture: picture
        });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        return next(err);
    }
};

exports.postAdminPictureSetting = async (req, res, next) => {
    try {

        const picId = req.params.picId;

        const picture = await Picture.findById(picId);

        if (!picture) {
            return res.status(404).json({ message: 'Picture not found in Database', success: false });
        }

        const newPicture = getPicture.update(req.body, picture);

        await newPicture.save();

        return res.status(200).json({ message: 'Picture settings updated succesfully', success: true });

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        return next(err);
    }
};

exports.getAdminUserPictures = async (req, res, next) => {
    try {

        const username = req.params.username;

        const user = await User.find({ username: username });

        if (!user) {
            return res.status(404).render('error/404', {
                pageTitle: "User Not Found",
                path: "404"
            });
        }

        const pics = await Picture.fetchUsername(user._id);

        res.status(200).render('admin/userPicture', {
            pageTitle: username + "'s pictures",
            path: "picture-user",
            pictures: pics,
        })

    } catch (err) {
        if (!err.httpStatusCode)
            err.httpStatusCode = 500;
        return next(err);
    }
}
