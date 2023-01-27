const express = require("express");
const router = express.Router();
const db = require("../model");
const helpers = require("../helpers/tattooers");
const { get } = require("mongoose");
const { post } = require("./mangas");
const multer = require("multer");
const { storage } = require("../cloudinary")
const upload = multer({ storage });

const isAdmin = require("../middlewares/isAdmin")
const isLoggedIn = require("../middlewares/isLoggedIn")
const isAuthor = require("../middlewares/isAuthor")



router.route("/")
    .get(helpers.findTattooers)
    .post(isLoggedIn, isAdmin, upload.fields([
        { name: "tattooer[profileImg.mobileImg]", maxCount: 1 },
        { name: "tattooer[favs.favManga.mangaImg]", maxCount: 1 },
        { name: "tattooer[favs.favAnime.animeImg]", maxCount: 1 },
    ]), helpers.createTattooer)


router.route("/:tattooerId")
    .get(helpers.findTattooer)
    .delete(isLoggedIn, isAdmin, helpers.deleteTattooer)

router.route("/:tattooerId/tattoos")
    .get(helpers.findAllTattoos)
    .post(isLoggedIn, isAdmin, upload.single("tattoo[imgSrc]"), helpers.createTattoo)


router.route("/:tattooerId/tattoos/:tattooId")
    .get(helpers.findTattoo)
    .delete(isLoggedIn, isAdmin, helpers.deleteTattoo)

router.route("/:tattooerId/tattoos/:tattooId/like")
    .post(isLoggedIn, helpers.likeTattoo)

router.route("/:tattooerId/tattoos/:tattooId/unlike")
    .post(isLoggedIn, helpers.unlikeTattoo)


router.route("/:tattooerId/comments")
    .get(helpers.findTattooerComments)
    .post(isLoggedIn, helpers.createTattooerComment)


router.route("/:tattooerId/comments/:commentId")
    .get(helpers.findTattooerComment)
    .delete(isLoggedIn, isAuthor, helpers.deleteTattooerComment)


module.exports = router;