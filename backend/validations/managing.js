const { body, param, oneOf, validationResult } = require('express-validator');

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

const checkTitle = [
    body('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title can not be empty")
        .isString()
        .withMessage("Title must be a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("Title must contain between 3 and 50 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkDescription = [

    body('description')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Description can not be empty")
        .isString()
        .withMessage("Description must be a string")
        .isLength({ min: 5, max: 100 })
        .withMessage("Description must contain between 5 and 100 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkVisibilty = [

    body('visibility')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Visibility can not be empty")
        .isString()
        .withMessage("Visibility must be a string")
        .isLength({ min: 6, max: 7 })
        .withMessage("Visibility must contain between 6 and 7 chars")
        .isAlphanumeric()
        .withMessage("Visibility Mail must contain only alphanumeric chars"),

    oneOf([
        body('visibility').equals('public'),
        body('visibility').equals('private')
    ], "Visibility must be \'public\' or \'private\'"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkComId = [

    body('comId')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("ComId can not be empty")
        .isString()
        .withMessage("ComId must be a string")
        .isAlphanumeric()
        .withMessage("ComId must contain only alphanumeric characters")
        .isLength({ min: 24, max: 24 })
        .withMessage("Invalid ComId"),

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

const checkCommentMsg = [

    body('commentMsg')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Comment can not be empty")
        .isString()
        .withMessage("Comment must be a string")
        .isLength({ min: 3, max: 100 })
        .withMessage("Comment must contain between 3 and 100 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

exports.picId = checkPicId;
exports.title = checkTitle;
exports.desc = checkDescription;
exports.visibility = checkVisibilty;
exports.comId = checkComId;
exports.commentMsg = checkCommentMsg;