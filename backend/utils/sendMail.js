const nodemailer = require("nodemailer");

const addToLogs = require('./logs');

const sendMail = (to, subject, body) => {

    const user = `${process.env.MAIL_TRANSACTIONAL}`;

    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        secure: true,
        port: 465,
        auth: {
            user: user,
            pass: `${process.env.MAIL_TR_PWD}`,
        },
    });

    let mailOptions = {
        from: '"📷 Camagru" <' + user + '>',
        to: to,
        subject: subject,
        html: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            addToLogs("MAIL ERROR", error + '/' + info.response);
        } else {
            addToLogs("MAIL INFO", 'Email sent successfully to ' + to + '/' + info.response);
        }
    });

}

module.exports = sendMail;
