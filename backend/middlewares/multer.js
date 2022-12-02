const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': '.jpg',
    'image/jpeg': '.jpeg',
    'image/png': '.png',
};

const fileStorage = multer.diskStorage (
    {
        destination: (req, file, cb) => {
            cb(null, 'data/upload');
        },
        filename: (req, file, cb) => {
            const extension = MIME_TYPES[file.mimetype];
            const name = req.session.user._id + '_' + new Date().valueOf().toString();

            cb(null, name + extension);
        }
    }
);

const fileFilter = (req, file, cb) => {

    for (const [mimetype, extension] of Object.entries(MIME_TYPES)) {
        if (file.mimetype === mimetype) {
            cb(null, true);
        }       
    }
    cb(null, false);
}

module.exports = multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fileSize: 5242880 } }).single('uploadInput');