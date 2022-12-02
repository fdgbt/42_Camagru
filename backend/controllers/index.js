const Picture = require('../models/picture');
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId

exports.getIndex = async (req, res, next) => {
  try {
    
    const galleryItems = 8;
    const paginatedItems = 5;

    let itemsPerPage;
    let paginated;

    if (req.query.page) {
      itemsPerPage = paginatedItems;
      paginated = true;
    } else {
      itemsPerPage = galleryItems;
      paginated = false;
    }

    const page = +req.query.page || 1;
    const user = req.session.user ? req.session.user._id : null;

    const pics = await Picture.fetchVisible();

    const totalPics = pics.length;
    const lastPage = Math.ceil(totalPics / itemsPerPage);
    const lastPagePaginated = Math.ceil(totalPics / paginatedItems);
    
    const pagePics = await Picture.fetchNVisible(itemsPerPage, totalPics, page ,lastPage);

    res.status(200).render('index', {
      pageTitle: "Gallery",
      path: "index",
      pictures: pagePics,
      user: user,
      lastPage: lastPage,
      lastPagePaginated: lastPagePaginated,
      currentPage: page,
      paginated: paginated
    });

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    return next(err);
  }
};

exports.getMorePicture = async (req, res, next) => {
  try {

    const itemsPerPage = 8;

    const page = +req.params.page;

    const pics = await Picture.fetchVisible();

    const totalPics = pics.length;

    const lastPage = Math.ceil(totalPics / itemsPerPage);

    const auth = req.session.user ? true : false;
    const user = req.session.user ? req.session.user._id : null;

    if (page > lastPage) {
      res.status(200).json({ pictures: [] });
    } else {
      const pagePics = await Picture.fetchNVisible(itemsPerPage, totalPics, page ,lastPage);

      res.status(200).json({ pictures: pagePics, auth: auth, user: user });
    }
  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    return next(err);
  }
};

exports.getPicture = async (req, res, next) => {
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

    if ((picture.visible === "private") && (picture.userId.toString() !== req.session.user._id.toString())) {
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

    res.status(200).render('picture/detail', {
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

exports.getUserPictures = async (req, res, next) => {
  try {

    const username = req.params.username;

    const user = await User.find({ username: username });

    if (!user) {
      return res.status(404).render('error/404', {
        pageTitle: "User Not Found",
        path: "404"
      });
    }

    const pics = await Picture.fetchVisibleUsername(user._id);

    res.status(200).render('picture/user', {
      pageTitle: username + " pictures",
      path: "picture-user",
      pictures: pics,
      user: req.session.user._id
    })

  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    return next(err);
  }
}
