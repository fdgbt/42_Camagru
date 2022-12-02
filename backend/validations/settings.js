const { body, oneOf, validationResult } = require('express-validator');

const checkNewPwd = [

    oneOf([

        body('password')
            .escape()
            .trim()
            .not()
            .isEmpty()
            .withMessage("New Password can not be empty")
            .isString()
            .withMessage("New Password must be a string")
            .isLength({ min: 8, max: 32 })
            .withMessage("New Password must contain between 8 and 32 characters")
            .not()
            .isLowercase()
            .withMessage("New Password must contain at least one uppercase character")
            .not()
            .isUppercase()
            .withMessage("New Password must contain at least one lowercase character")
            .not()
            .isAlphanumeric()
            .withMessage("New Password must contain at least one special character")
            .matches(".*[0-9].*")
            .withMessage("New Password must contain at least one number")
            .isStrongPassword(
                {
                    minLength: 8,
                    maxLength: 32,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }
            )
            .withMessage("New Password does not meet minimal requirements"),

        body('password')
            .isEmpty()
            .withMessage("Password can be left empty to keep current Password"),

    ], "Leaving blank will keep your current Password"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].nestedErrors[1].msg + '\n' + errArray[0].msg, input: errArray[0].nestedErrors[1].param, success: false });
        }
        next();
    },
];

const checkCurrentPwd = [

    body('currentPassword')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Current Password can not be empty")
        .isString()
        .withMessage("Current Password must be a string")
        .isLength({ min: 8, max: 32 })
        .withMessage("Current Password must contain between 8 and 32 characters")
        .not()
        .isLowercase()
        .withMessage("Current Password must contain at least one uppercase character")
        .not()
        .isUppercase()
        .withMessage("Current Password must contain at least one lowercase character")
        .not()
        .isAlphanumeric()
        .withMessage("Current Password must contain at least one special character")
        .matches(".*[0-9].*")
        .withMessage("Current Password must contain at least one number")
        .isStrongPassword(
            {
                minLength: 8,
                maxLength: 32,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }
        )
        .withMessage("Current Password does not meet minimal requirements"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkPrefs = [

    body('comsMail')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Comments Mail can not be empty")
        .isString()
        .withMessage("Comments Mail must be a string")
        .isLength({ min: 4, max: 5 })
        .withMessage("Comments Mail must contain between 4 and 5 chars")
        .isAlphanumeric()
        .withMessage("omments Mail must contain only alphanumeric chars"),
    oneOf([
        body('comsMail').equals('true'),
        body('comsMail').equals('false')
    ], "Comments Mail must be \'true\' (Yes) or \'false\' (No)"),

    body('likesMail')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Likes Mail can not be empty")
        .isString()
        .withMessage("Likes Mail must be a string")
        .isLength({ min: 4, max: 5 })
        .withMessage("Likes Mail must contain between 4 and 5 chars")
        .isAlphanumeric()
        .withMessage("Likes Mail must contain only alphanumeric chars"),
    oneOf([
        body('likesMail').equals('true'),
        body('likesMail').equals('false')
    ], "Likes Mail must be \'true\' (Yes) or \'false\' (No)"),

    body('levelsMail')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Levels Mail can not be empty")
        .isString()
        .withMessage("Levels Mail must be a string")
        .isLength({ min: 4, max: 5 })
        .withMessage("Levels Mail must contain between 4 and 5 chars")
        .isAlphanumeric()
        .withMessage("LevelsLikes Mail must contain only alphanumeric chars"),
    oneOf([
        body('levelsMail').equals('true'),
        body('levelsMail').equals('false')
    ], "Levels Mail must be \'true\' (Yes) or \'false\' (No)"),

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

exports.newPwd = checkNewPwd;
exports.currentPwd = checkCurrentPwd;
exports.prefs = checkPrefs;