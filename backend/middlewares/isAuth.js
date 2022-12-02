module.exports = (req, res, next) => {

    if (!req.session.authenticated) 
        return res.status(401).render('error/401', {
            pageTitle: "Unauthorized Access",
            path: req.path.replace('/', ''),
            authenticated: false
          });

    next();
}