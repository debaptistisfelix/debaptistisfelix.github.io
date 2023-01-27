const express = require("express");
const router = express.Router();
const db = require("../model")
const returnTo = require("../middlewares/returnTo");
const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin");
const catchAsync = require("../utils/catchAsync");



router.get("/createMangaReview", returnTo, isLoggedIn, isAdmin, (req, res) => {
    res.render("newManga")
})

router.get("/createTattooer", returnTo, isLoggedIn, isAdmin, (req, res) => {
    res.render("newTattooer")
})

router.get("/addTattoos/:tattooerId", isLoggedIn, isAdmin, catchAsync(async (req, res) => {
    const { tattooerId } = req.params;
    const tattooer = await db.Tattooer.findById(tattooerId);
    res.render("addTattoos", { tattooer })
}))

router.get("/createPanel", returnTo, isLoggedIn, isAdmin, async (req, res) => {
    res.render("newPanel")

})

module.exports = router