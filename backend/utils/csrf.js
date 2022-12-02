const crypto = require('crypto');

const csrfToken = () => {

    const buffer = crypto.randomBytes(100);
        
    if (!buffer) {
        const error = new Error('Failed to create csrfToken.');

        error.httpStatusCode = 500;
        throw error;
    }

    const token = buffer.toString('hex');

    return token;
};

exports.csrfToken = csrfToken;
