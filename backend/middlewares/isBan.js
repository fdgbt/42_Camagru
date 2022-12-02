module.exports = (req, res, next) => {
    if (req.session.authenticated && req.session.user.admin.role === "Banned") 
        return res.status(401).render('error/401bis', {
            pageTitle: "Unauthorized Access",
            path: req.path.replace('/', ''),
            authenticated: req.session.authenticated
          });

    next();
}