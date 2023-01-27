const db = require("../model");

exports.renderRegisterPage = (req, res) => {
    res.render("signup")
}

exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password, birthdate } = req.body;
        const user = new db.User({ email, username, birthdate });
        const registeredUser = await db.User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to the DPRSSD Otaku Community!")
            res.redirect("/")
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/register")
    }
}

exports.renderLoginPage = (req, res) => {
    res.render("login")
}

exports.loginUser = (req, res) => {
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

exports.logOutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Logged out");
        const redirectUrl = req.session.returnTo || "/"
        res.redirect(redirectUrl);
    });
}

module.exports = exports;