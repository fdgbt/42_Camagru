module.exports = (req, res, next) => {

    if (req.session.user.admin.role !== 'Moderator' && req.session.user.admin.role !== 'Administrator') 
        return res.status(403).render('error/403', {
            pageTitle: "Permission Denied",
            path: "403",
            authenticated: req.session.authenticated
          });

    next();
}