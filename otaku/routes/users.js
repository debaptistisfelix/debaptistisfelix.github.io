const express = require("express");
const router = express.Router();
const db = require("../model");
const catchAsync = require("../utils/catchAsync")
const passport = require("passport");
const User = db.User;
const helpers = require("../helpers/user")


router.get("/register", helpers.renderRegisterPage)

router.post("/register", catchAsync(helpers.registerUser))

router.get("/login", helpers.renderLoginPage)

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), helpers.loginUser)


router.get('/logout', helpers.logOutUser);

module.exports = router;