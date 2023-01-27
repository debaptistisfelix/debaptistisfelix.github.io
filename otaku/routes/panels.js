const express = require("express");
const router = express.Router();
const db = require("../model");
const helpers = require("../helpers/panels");
const multer = require("multer");
const { storage } = require("../cloudinary")
const upload = multer({ storage });
const isAdmin = require("../middlewares/isAdmin")
const isLoggedIn = require("../middlewares/isLoggedIn")
const isAuthor = require("../middlewares/isAuthor")


router.route("/")
    .get(helpers.findPanels)
    .post(isLoggedIn, isAdmin, upload.fields([{ name: "panel[panelSrc]", maxCount: 1 }, { name: "panel[fromManga.MangaVol]", maxCount: 1 }]), helpers.createPanel)



router.route("/:panelId")
    .get(helpers.findPanel)
    .delete(isLoggedIn, isAdmin, helpers.deletePanel)

router.route("/:panelId/upvote")
    .post(isLoggedIn, helpers.upvotePanel)
router.route("/:panelId/upvote/remove")
    .post(isLoggedIn, helpers.removeUpvotePanel)

router.route("/:panelId/downvote")
    .post(isLoggedIn, helpers.downvotePanel)
router.route("/:panelId/downvote/remove")
    .post(isLoggedIn, helpers.removeDownvotePanel)


module.exports = router;