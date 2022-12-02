const { body, check, validationResult } = require('express-validator');

const checkEmail = [

    body('email')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email can not be empty")
        .isString()
        .withMessage("Email must be a string")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail()
        .custom(value => {
            if (value.includes("admin") || value.includes("root") || value.includes("moderator")) {
                return res.status(422).json({ message: "This Email is forbidden", input: "email", success: false });
            } else {
                return value;
            }
        })
        .withMessage("This Email is forbidden"),
        
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkUsername = [

    body('username')
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

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
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
        .withMessage("Password can not be empty")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 8, max: 32 })
        .withMessage("Password must contain between 8 and 32 characters")
        .not()
        .isLowercase()
        .withMessage("Password must contain at least one uppercase character")
        .not()
        .isUppercase()
        .withMessage("Password must contain at least one lowercase character")
        .not()
        .isAlphanumeric()
        .withMessage("Password must contain at least one special character")
        .matches(".*[0-9].*")
        .withMessage("Password must contain at least one number")
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
        .withMessage("Password does not meet minimal requirements"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },

];

const checkToken = [

    check('token')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage("Token can not be empty")
        .isString()
        .withMessage("Token must be a string")
        .isLength({ min: 64, max: 64 })
        .withMessage("Invalid Token")
        .isAlphanumeric()
        .withMessage("Invalid Token"),
        
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

exports.email = checkEmail;
exports.username = checkUsername;
exports.password = checkPwd;
exports.token = checkToken;