const fs = require('fs');

const deleteFile = (filePath, next) => {
    fs.unlink(filePath, (err) => {
        if (err)
            return next(err);
    });
};

module.exports = deleteFile;