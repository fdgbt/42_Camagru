const User = require("../models/user");

const sendMail = require('../utils/sendMail');
const contactMail = require('../mails/contact').getContactMail;

exports.getContact = (req, res, next) => {
  res.status(200).render('contact', {
    pageTitle: "Contact",
    path: "contact",
    user: req.session.user
  });
};

exports.postContact = async (req, res, next) => {
  try {

    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    let mail;

    const admins = await User.findAll({"admin.role": 'Administrator'});

    if (!admins.length) {
      return res.status(404).json({ message: 'User with Administrator role missing', input: 'email', success: false });
    }
   
    admins.forEach((admin) => {
      mail = contactMail(admin.username, email, subject, message);
      sendMail(admin.email, mail.subject, mail.html);
    });

    if (subject === "Moderation") {
      const modos = await User.findAll({"admin.role": 'Moderator'});

      modos.forEach((modo) => {
        mail = contactMail(modo.username, email, subject, message);
        sendMail(modo.email, mail.subject, mail.html);
      });
    }

    return res.status(200).json({ message: 'Contact message sent successfully', success: true });
    
  } catch (err) {
    if (!err.httpStatusCode)
      err.httpStatusCode = 500;
    next(err);
  }
};