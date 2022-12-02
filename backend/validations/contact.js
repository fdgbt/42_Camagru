const { body, validationResult } = require('express-validator');

const checkSubject = [

    body('subject')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Subject can not be empty")
        .isString()
        .withMessage("Subject must be a string")
        .isAlphanumeric()
        .withMessage("Subject must contain only alphanumeric characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkMessage = [

    body('message')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Message can not be empty")
        .isString()
        .withMessage("Message must be a string")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Message must contain between 10 and 1000 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

exports.subject = checkSubject;
exports.message = checkMessage;