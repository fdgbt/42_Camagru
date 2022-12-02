const csrfToken = require('../utils/csrf').csrfToken;

module.exports = (req, res, next) => {

    if (req.method === 'GET') {
        req.session.csrfToken = csrfToken();
        req.session.save((err) => {
            if (err) {
                const error = new Error('Failed to save csrfToken in session.');

                error.httpStatusCode = 500;
                throw error;
            }
            return next();
        });
    } else {
        let postToken = null;

        if (req.body)
            postToken = req.body._csrf;

        if (!postToken)
            postToken = req.get('Csrf-Token');

        if (req.session.csrfToken !== postToken) {
            return res.status(403).json({ message: 'Access Forbidden', success: false });
        } else {
            return next();
        }

    }

}