const mongodb = require('mongodb');

const Picture = require('../models/picture');
const User = require('../models/user');

const getPicture = require('../utils/picture');
const deleteFile = require('../utils/deleteFile');
const setUserLevel = require('../utils/userLevel');
const sendMail = require('../utils/sendMail');

const newComMail = require('../mails/newComment').getNewComMail;
const newLikeMail = require('../mails/newLike').getNewLikeMail;
const newLevelMail = require('../mails/newLevel').getNewLevelMail;

exports.getManaging = async (req, res, next) => {
  try {

    const pics = await Picture.fetchOwned(req.session.user._id);

    res.status(200).render('managing', {
      pageTitle: "Manage my Photos",
      path: "managing",
      pictures: pics
    });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    return next(err);
  }
};

exports.getPictureSetting = async (req, res, next) => {
  try {

    const picId = req.params.picId;

    const picture = await Picture.findById(picId);

    if (!picture) {
      return res.redirect('/managing');
    }

    return res.status(200).render('picture/settings', {
      pageTitle: "Edit your photo",
      path: "picture-setting",
      admin: "",
      picture: picture
    });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    return next(err);
  }
};

exports.postPictureSetting = async (req, res, next) => {
  try {

    const picId = req.params.picId;

    const picture = await Picture.findById(picId);

    if (!picture) {
      return res.status(404).json({ message: 'Picture not found in Database', success: false });
    }

    if (picture.userId.toString() !== req.session.user._id.toString()) {
      return res.status(403).json({ message: 'Picture owner does not match with current User', success: false });
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

exports.likePicture = async (req, res, next) => {
  try {

    const picId = req.params.picId;
    const userId = req.session.user._id;

    let newLike = false;

    if (!userId) {
      return res.status(404).json({ message: 'userId not found in Session', success: false });
    }

    if (!picId) {
      return res.status(404).json({ message: 'missing picId', success: false });
    }

    const picture = await Picture.findById(picId);

    if (!picture) {
      return res.status(404).json({ message: 'Picture not found in Database', success: false });
    }

    if (picture.likes.some(id => id.toString() === userId.toString())) {
      picture.likes = picture.likes.filter(id => id.toString() !== userId.toString());
    } else {
      picture.likes.push(userId);
      newLike = true;
    }

    const updatedPic = new Picture(
      picture.title,
      picture.description,
      picture.date,
      picture.imgUrl,
      picture.likes,
      picture.comments,
      picture.visible,
      picture.userId,
      picture._id
    );

    await updatedPic.save();

    if (newLike) {

      if (picture.userId.toString() !== req.session.user._id.toString()) {
        const picOwner = await User.findById(picture.userId);

        if (!picOwner) {
          return res.status(404).json({ message: 'Picture Owner not found in Database', success: false });
        }

        const username = req.session.user.username;

        const newLevel = await setUserLevel(picOwner, picture.likes.length);

        if (picOwner.prefs.levelsMail && newLevel) {
          const mail = newLevelMail(picOwner.username, picture.likes.length, newLevel, picture.title, username, picture._id);

          sendMail(picOwner.email, mail.subject, mail.html);
        }

        if (picOwner.prefs.likesMail && (!newLevel || (!picOwner.prefs.levelsMail && newLevel))) {

          const mail = newLikeMail(picOwner.username, picture.title, username, picture.likes.length, picId);

          sendMail(picOwner.email, mail.subject, mail.html);
        }
      }
      return res.status(200).json({ message: 'Picture liked successfully', likes: updatedPic.likes.length, success: true });
    }

    return res.status(200).json({ message: 'Picture unliked successfully', likes: updatedPic.likes.length, success: true });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.commentPicture = async (req, res, next) => {
  try {

    const picId = req.params.picId;

    const comment = {
      text: req.body.commentMsg,
      date: new Date(),
      userId: req.session.user._id,
      _id: new mongodb.ObjectId()
    };

    const picture = await Picture.findById(picId);

    if (!picture) {
      return res.status(404).json({ message: 'Picture not found in Database', success: false });
    }

    picture.comments.push(comment);

    const updatedPic = new Picture(
      picture.title,
      picture.description,
      picture.date,
      picture.imgUrl,
      picture.likes,
      picture.comments,
      picture.visible,
      picture.userId,
      picture._id
    );

    await updatedPic.save();

    comment.username = req.session.user.username;

    if (picture.userId.toString() !== req.session.user._id.toString()) {
      const picOwner = await User.findById(picture.userId);

      if (picOwner && picOwner.prefs.comsMail) {
        const mail = newComMail(picOwner.username, picture.title, comment.username, picId);

        sendMail(picOwner.email, mail.subject, mail.html);
      }
    }

    return res.status(200).json({ message: 'Picture commented !', comment: comment, comments: updatedPic.comments, success: true });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.deleteComment = async (req, res, next) => {
  try {

    const picId = req.params.picId;
    const comId = req.body.comId;

    const picture = await Picture.findById(picId);

    if (!picture) {
      return res.status(404).json({ message: 'Picture not found in Database', success: false });
    }

    const comOwner = picture.comments.find(com => com.userId.toString() === req.session.user._id.toString());

    if (!comOwner) {
      return res.status(403).json({ message: 'Comment owner does not match with current User', success: false });
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

    return res.status(200).json({ message: 'Comment deleted successfully', comments: updatedPic.comments, success: true });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}

exports.deletePicture = async (req, res, next) => {
  try {

    const picId = req.params.picId;

    const picture = await Picture.findById(picId);

    if (!picture) {
      return res.status(404).json({ message: 'Picture not found in Database', success: false });
    }

    if (picture.userId.toString() !== req.session.user._id.toString()) {
      return res.status(403).json({ message: 'Picture owner does not match with current User', success: false });
    }

    if (picture && picture.imgUrl.match(/https?:\/\//g) === null)
      deleteFile(picture.imgUrl, next);

    await Picture.deleteById(picId);

    return res.status(200).json({ message: 'Picture deleted successfully', success: true });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
}