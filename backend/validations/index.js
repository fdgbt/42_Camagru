const { param, check, oneOf, validationResult } = require('express-validator');

const checkPicId = [

    param('picId')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("PicId can not be empty")
        .isString()
        .withMessage("PicId must be a string")
        .isAlphanumeric()
        .withMessage("PicId must contain only alphanumeric characters")
        .isLength({ min: 24, max: 24 })
        .withMessage("Invalid PicId"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            if (req.method === "GET") {
                return res.status(403).render('error/403', {
                    pageTitle: errArray[0].msg,
                    path: "403"
                });
            } else {
                return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
            }
        }
        next();
    },
];

const checkUsername = [
    param('username')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Username can not be empty")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 10 })
        .withMessage("Username must contain between 3 and 10 characters")
        .isAlphanumeric()
        .withMessage("Username must contain only alphanumeric characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            if (req.method === "GET") {
                return res.status(403).render('error/403', {
                    pageTitle: errArray[0].msg,
                    path: "403"
                });
            } else {
                return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
            }
        }
        next();
    },
];

const checkPage = [

    oneOf([

        check('page')
            .escape()
            .trim()
            .not()
            .isEmpty()
            .withMessage("Page can not be empty")
            .isString()
            .withMessage("Page must be a string")
            .isNumeric()
            .withMessage("Page must contain only numeric character")
            .isLength({ min: 1, max: 3 })
            .withMessage("Page must be between 0 and 999"),

        check('page')
            .isEmpty()
            .withMessage("Page can be left empty to use infinite loading mode"),

    ], "Page can be left empty to use infinite loading mode"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            if (req.method === "GET") {
                return res.status(403).render('error/403', {
                    pageTitle: errArray[0].msg,
                    path: "403"
                });
            } else {
                return res.status(422).json({ message: errArray[0].nestedErrors[1].msg + '\n' + errArray[0].msg, input: errArray[0].nestedErrors[1].param, success: false });
            }
        }
        next();
    },
];

exports.picId = checkPicId;
exports.username = checkUsername;
exports.page = checkPage;