const returnTo = function (req, res, next) {
    if (!req.user) {
        req.session.returnTo = req.originalUrl
    }
    next();
};

module.exports = returnTo;