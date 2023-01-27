const express = require("express");
const router = express.Router();
const db = require("../model");
const methodOverride = require("method-override");
const ExpressError = require("../utils/ExpressError");
const returnTo = require("../middlewares/returnTo")
const catchAsync = require("../utils/catchAsync");


router.get("/", returnTo, catchAsync(async (req, res) => {
    const panels = await db.Panel.find();
    const panel = panels[panels.length - 1]
    const tattooers = await db.Tattooer.find().populate("tattoos");
    const tattooer = tattooers[tattooers.length - 1]
    res.render("homepage", { panels, panel, tattooer })
}))


router.get("/categories", returnTo, catchAsync(async (req, res) => {
    const mangas = await db.Manga.find();
    res.render("categories", { mangas })
}))



router.get("/index/:mangaId", returnTo, catchAsync(async (req, res, next) => {
    const manga = await db.Manga.findById(req.params.mangaId).populate({
        path: "comments",
        populate: {
            path: "author"
        }
    })
    if (!manga) throw new ExpressError("No Manga found with this ID", 404)
    res.render("mangaReview", { manga });
}))

router.get("/tattooersList", returnTo, catchAsync(async (req, res) => {
    const tattooers = await db.Tattooer.find();
    res.render("tattooersList", { tattooers })
}))

router.get("/tattooersList/:tattooerId", returnTo, catchAsync(async (req, res) => {
    const tattooer = await db.Tattooer.findById(req.params.tattooerId).populate("tattoos");
    if (!tattooer) throw new ExpressError("No Tattooer found with this ID", 404)
    res.render("tattooerPage", { tattooer })
}))

module.exports = router