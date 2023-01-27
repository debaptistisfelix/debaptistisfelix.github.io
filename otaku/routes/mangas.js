const express = require("express");
const router = express.Router();
const db = require("../model")
const helpers = require("../helpers/mangas");

const multer = require("multer");
const { storage } = require("../cloudinary")
const upload = multer({ storage });
const isAdmin = require("../middlewares/isAdmin")
const isLoggedIn = require("../middlewares/isLoggedIn")
const isAuthor = require("../middlewares/isAuthor")




router.route("/")
    .get(helpers.getMangas)
    .post(isLoggedIn, isAdmin, upload.fields([
        { name: "manga[mangaVolumes.smallVol]", maxCount: 1 },
        { name: "manga[panels.panelMobile]", maxCount: 1 },
        { name: "manga[panels.panelTablet]", maxCount: 1 },
        { name: "manga[panels.panelDesktop]", maxCount: 1 },
        { name: "manga[review.reviewImg1]", maxCount: 1 },
        { name: "manga[review.reviewImg2]", maxCount: 1 },
        { name: "manga[review.reviewImg3]", maxCount: 1 }
    ]), helpers.createManga)




/* router.get("/search", helpers.searchManga) */


router.route("/:mangaId")
    .get(helpers.findManga)
    .delete(isLoggedIn, isAdmin, helpers.deleteManga)

router.route("/:mangaId/comments")
    .get(helpers.findMangaComments)
    .post(isLoggedIn, helpers.createMangaComment)


router.route("/:mangaId/comments/:commentId")
    .get(helpers.findMangaComment)
    .delete(isLoggedIn, isAuthor, helpers.deleteMangaComment)


module.exports = router