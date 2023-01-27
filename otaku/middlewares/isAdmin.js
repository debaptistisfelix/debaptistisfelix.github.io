const isAdmin = (req, res, next) => {
    if (req.user.username !== process.env.POWER) {
        err.message = "Admin zone, bruh."
        res.render("error")
    }
    next();
}

module.exports = isAdmin;