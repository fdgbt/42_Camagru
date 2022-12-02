const { param, body, oneOf, validationResult } = require('express-validator');

const checkUserId = [

    param('userId')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("userId can not be empty")
        .isString()
        .withMessage("userId must be a string")
        .isAlphanumeric()
        .withMessage("userId must contain only alphanumeric characters")
        .isLength({ min: 24, max: 24 })
        .withMessage("Invalid userId"),

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

const checkPwd = [

    body('password')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Admin Password can not be empty")
        .isString()
        .withMessage("Admin Password must be a string")
        .isLength({ min: 8, max: 32 })
        .withMessage("Admin Password must contain between 8 and 32 characters")
        .not()
        .isLowercase()
        .withMessage("Admin Password must contain at least one uppercase character")
        .not()
        .isUppercase()
        .withMessage("Admin Password must contain at least one lowercase character")
        .not()
        .isAlphanumeric()
        .withMessage("Admin Password must contain at least one special character")
        .matches(".*[0-9].*")
        .withMessage("Admin Password must contain at least one number")
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
        .withMessage("Admin Password does not meet minimal requirements"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkEnabled = [

    body('enabled')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Enabled can not be empty")
        .isString()
        .withMessage("Enabled must be a string")
        .isLength({ min: 4, max: 5 })
        .withMessage("Enabled must contain between 4 and 5 chars")
        .isAlphanumeric()
        .withMessage("Enabled must contain only alphanumeric chars"),
    oneOf([
        body('enabled').equals('true'),
        body('enabled').equals('false')
    ], "Enabled must be \'true\' (Yes) or \'false\' (No)"),

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

const checkLevel = [

    body('level')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Level can not be empty")
        .isString()
        .withMessage("Level must be a string")
        .isLength({ min: 4, max: 10 })
        .withMessage("Level must contain between 4 and 10 chars")
        .isAlphanumeric()
        .withMessage("Level must contain only alphanumeric chars"),
    oneOf([
        body('level').equals('Newbie'),
        body('level').equals('Bronze'),
        body('level').equals('Silver'),
        body('level').equals('Gold'),
        body('level').equals('Platinum'),
        body('level').equals('Titanium'),
        body('level').equals('Palladium'),
        body('level').equals('Diamond'),
        body('level').equals('Antimatter')
    ], "Level must be one of the following: \'Newbie\', \'Bronze\', \'Silver\', \'Gold\', \'Platinum\', \'Titanium\', \'Newbie\', \'Palladium\', \'Diamond\', \'Antimatter\'"),

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

const checkRole = [

    body('role')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Role can not be empty")
        .isString()
        .withMessage("Role must be a string")
        .isLength({ min: 4, max: 13 })
        .withMessage("Role must contain between 4 and 13 chars")
        .isAlphanumeric()
        .withMessage("Role must contain only alphanumeric chars"),
    oneOf([
        body('role').equals('Banned'),
        body('role').equals('User'),
        body('role').equals('Moderator'),
        body('role').equals('Administrator')
    ], "Role must be one of the following: \'Banned\', \'User\', \'Modo\', \'Admin\'"),

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

exports.userId = checkUserId;
exports.password = checkPwd;
exports.enabled = checkEnabled;
exports.level = checkLevel;
exports.role = checkRole;