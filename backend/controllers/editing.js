const Picture = require('../models/picture');
const getPicture = require('../utils/picture');
const addToLogs = require('../utils/logs');


exports.getEditing = async (req, res, next) => {
  try {

    const pics = await Picture.fetchOwnedN(req.session.user._id, 8);

    return res.status(200).render('editing', {
      pageTitle: "Take a Picture",
      path: "editing",
      pictures: pics
    });

  } catch (err) {

    addToLogs(err);
    if (!err.httpStatusCode) {
      err.httpStatusCode = 500;
    }
    next(err);
  }
};

exports.postEditing = async (req, res, next) => {
  try {

    if (!req.body) {
      return res.status(404).json({ message: "Missing Cam Raw Data", success: false });
    }

    const body = JSON.parse(req.body);

    const totalEffects = body.effects.length;

    if (!totalEffects)
      return res.status(403).json({ message: 'Need at least one effect selected', success: false });

    if (totalEffects > 11)
      return res.status(403).json({ message: 'Reached max effects limit (1 effect + 10 masks)', success: false });

    const picture = await getPicture.cam(req.session, body);

    if (picture) {
      await picture.save();

      return res.status(201).json({ message: "Picture Created successfully", data: picture, success: true });

    } else {
      return res.status(500).json({ message: 'Failed to create Picture', success: false });
    }

  } catch (err) {
    addToLogs(err);
    return res.status(500).json({ message: 'Failed to create Picture', success: false });
  }
};

exports.postEditingFile = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(404).json({ message: "Missing File Data (Unsupported Format)", success: false });
    }

    const body = JSON.parse(req.body.formEffect);

    const totalEffects = body.effects.length;

    if (!totalEffects)
      return res.status(403).json({ message: 'Need at least one effect selected', success: false });

    if (totalEffects > 11)
      return res.status(403).json({ message: 'Reached max effects limit (1 effect + 10 masks)', success: false });

    const picture = await getPicture.upload(req.session, body, req.file);

    if (picture) {
      await picture.save();

      return res.status(201).json({ message: "Picture uploaded successfully", data: picture, success: true });

    } else {
      return res.status(500).json({ message: 'Failed to upload Picture', success: false });
    }

  } catch (err) {
    addToLogs(err);
    return res.status(500).json({ message: 'Failed to upload Picture', success: false });
  }
};

exports.postEditingLink = async (req, res, next) => {
  try {

    if (!req.body) {
      return res.status(404).json({ message: "Missing Link Data", success: false });
    }

    const body = JSON.parse(req.body.formEffect);

    const totalEffects = body.effects.length;

    if (!totalEffects)
      return res.status(403).json({ message: 'Need at least one effect selected', success: false });

    if (totalEffects > 11)
      return res.status(403).json({ message: 'Reached max effects limit (1 effect + 10 masks)', success: false });

    const picture = await getPicture.link(req.session, body, req.body.linkInput);

    if (picture) {
      await picture.save();

      return res.status(201).json({ message: "Picture linked successfully", data: picture, success: true });
    } else {
      return res.status(403).json({ message: "Failed to link Picture (Wrong URL)", success: false });
    }

  } catch (err) {
    addToLogs(err);
    return res.status(500).json({ message: 'Failed to link Picture', success: false });
  }
};
