module.exports = (req, res, next) => {

    if (!req.session.user.admin.enabled) {
        if (req.get('Content-Type') === 'application/json') {
            return res.status(402).json({ message: "Activation required", success: false });
        } else {
            return res.status(402).render('error/402', {
                pageTitle: "Activation Required",
                path: req.path.replace('/', ''),
                authenticated: req.session.authenticated
            });
        }
    }
    next();
}