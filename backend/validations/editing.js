const { body, oneOf, validationResult } = require('express-validator');

const checkLink = [

    body('linkInput')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Link can not be empty")
        .isString()
        .withMessage("Link must be a string")
        .isURL()
        .withMessage("Invalid Url")
        .matches("\.(jpeg|jpg|png)$")
        .withMessage("Invalid File Format"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkEffect = (effect) => {

    if (typeof effect.type !== 'number') {
        throw new Error('Effect type must be a number');
    }
    if (effect.type < 1 || effect.type > 10) {
        throw new Error('Effect type out of range (1 - 10)');
    }

    if (typeof effect.value === 'string') {
        if (effect.value.length === 0) {
            throw new Error('Effect value can not be empty');
        }
        try {
            url = new URL(effect.value);
        } catch (err) {
            throw new Error('Effect value must be a valid URL');
        }
    } else if (typeof effect.value === 'number') {
        if (effect.value < 1 || effect.value > 10) {
            throw new Error('Effect value out of range [1 ; 10]');
        }
    } else
        throw new Error('Effect value must be a string or a number');

    if (typeof effect.offsetX !== 'number') {
        throw new Error('Effect offsetX must be a number');
    }
    if (effect.offsetX < -1000 || effect.offsetX > 3840) {
        throw new Error('Effect offsetX out of range [-500 ; 3840]');
    }

    if (typeof effect.offsetY !== 'number') {
        throw new Error('Effect offsetY must be a number');
    }
    if (effect.offsetY < -1000 || effect.offsetY > 2160) {
        throw new Error('Effect offsetY out of range [-500 ; 2160]');
    }

    if (typeof effect.offsetW !== 'number') {
        throw new Error('Effect offsetW must be a number');
    }
    if (effect.offsetW < 0 || effect.offsetW > 3840) {
        throw new Error('Effect offsetW out of range [0 ; 3840]');
    }

    if (typeof effect.camHeight !== 'number') {
        throw new Error('Effect camHeight must be a number');
    }
    if (effect.camHeight <= 0 || effect.camHeight > 2160) {
        throw new Error('Effect camHeight out of range [1 ; 2160]');
    }

    if (typeof effect.camWidth !== 'number') {
        throw new Error('Effect camWidth must be a number');
    }
    if (effect.camWidth <= 0 || effect.camWidth > 3840) {
        throw new Error('Effect camWidth out of range [1 ; 3840]');
    }
}

const checkCamEffects = [

    body()
        .custom((obj) => {

            if (!obj) {
                throw new Error('Body is missing');
            }

            const body = JSON.parse(obj);

            if (!body.effects) {
                throw new Error('Body does not contain \'effects\'');
            }

            body.effects.forEach(effect => {
                checkEffect(effect);
            });

            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkUploadEffects = [

    body()
        .custom((obj) => {

            if (!obj) {
                throw new Error('Body is missing');
            }
            if (!obj.formEffect) {
                throw new Error('Body does not contain \'formEffect\'');
            }

            const body = JSON.parse(obj.formEffect);

            if (!body.effects) {
                throw new Error('Body does not contain \'effects\' in \'formEffect\'');
            }

            body.effects.forEach(effect => {
                checkEffect(effect);
            });

            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].msg, input: errArray[0].param, success: false });
        }
        next();
    },
];

const checkSpecialEffect = [

    oneOf([

        body('specialInput')
            .escape()
            .trim()
            .not()
            .isEmpty()
            .withMessage("Special Effect can not be empty")
            .isString()
            .withMessage("Special Effect must be a string")
            .isLength({ min: 1, max: 2 })
            .withMessage("Special Effect must contain between 1 and 2 characters")
            .isNumeric()
            .withMessage("Special Effect must contain only numerical character"),

        body('specialInput')
            .isEmpty()
            .withMessage("Special Effect can be left empty to use Normal Effect"),

    ], "Leaving blank require the use of Normal Effect"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArray = errors.array();

            return res.status(422).json({ message: errArray[0].nestedErrors[1].msg + '\n' + errArray[0].msg, input: errArray[0].nestedErrors[1].param, success: false });
        }
        next();
    },
];

exports.link = checkLink;
exports.camEffects = checkCamEffects;
exports.uploadEffects = checkUploadEffects;
exports.special = checkSpecialEffect;