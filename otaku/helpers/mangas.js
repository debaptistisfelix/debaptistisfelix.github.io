const db = require("../model");



exports.getMangas = (req, res) => {
    db.Manga.find()
        .then((mangas) => {
            res.json(mangas);
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.createManga = async (req, res) => {
    const newManga = await db.Manga.create(req.body.manga);
    try {
        const sVol = req.files['manga[mangaVolumes.smallVol]'][0];
        newManga.mangaVolumes.smallVol = {
            url: sVol.path,
            filename: sVol.filename
        };
        const panelMob = req.files['manga[panels.panelMobile]'][0];
        newManga.panels.panelMobile = {
            url: panelMob.path,
            filename: panelMob.filename
        };
        const panelTab = req.files['manga[panels.panelTablet]'][0];
        newManga.panels.panelTablet = {
            url: panelTab.path,
            filename: panelTab.filename
        };
        await newManga.save();
        const panelDes = req.files['manga[panels.panelDesktop]'][0];
        newManga.panels.panelDesktop = {
            url: panelDes.path,
            filename: panelDes.filename
        };
        const revImg1 = req.files['manga[review.reviewImg1]'][0];
        newManga.review.reviewImg1 = {
            url: revImg1.path,
            filename: revImg1.filename
        };
        const revImg2 = req.files['manga[review.reviewImg2]'][0];
        newManga.review.reviewImg2 = {
            url: revImg2.path,
            filename: revImg2.filename
        };
        const revImg3 = req.files['manga[review.reviewImg3]'][0];
        newManga.review.reviewImg3 = {
            url: revImg3.path,
            filename: revImg3.filename
        };
        await newManga.save();
        res.status(201).json(newManga)
    }
    catch (err) {
        res.send(err)
    }
}

/* exports.searchManga = (req, res) => {
    const result = db.Manga.find({ $text: { $search: req.query.title } })
        .then((result) => {
            res.json(result)
        })
        .catch(err => {
            res.send(err)
        })
} */

exports.findManga = (req, res) => {
    db.Manga.findById(req.params.mangaId).populate("comments")
        .then((foundManga) => {
            res.json(foundManga);
        })
        .catch(err => {
            res.send(err)
        })
}




exports.deleteManga = (req, res) => {
    db.Manga.remove({ _id: req.params.mangaId })
        .then(function () {
            res.json({ message: "Deleted!" })
        })
        .catch(function (err) {
            res.send(err);
        })
}


// MANGA REVIEW COMMENTS //


exports.findMangaComments = async (req, res) => {
    const manga = await db.Manga.findById(req.params.mangaId).populate({
        path: "comments",
        populate: {
            path: "author"
        }
    });
    const comments = manga.comments;
    res.json(comments);
}

exports.createMangaComment = async (req, res) => {
    const manga = await db.Manga.findById(req.params.mangaId).populate({
        path: "comments",
        populate: {
            path: "author"
        }
    })
    const newComment = (await db.Comment.create(req.body))
    newComment.author = req.user._id;
    manga.comments.push(newComment);
    await newComment.save();
    await manga.save();
    const newCommentId = newComment._id;
    const populatedComment = await db.Comment.findById(newCommentId).populate("author");
    res.json(populatedComment);


}

exports.findMangaComment = async (req, res) => {
    const manga = await db.Manga.findById(req.params.mangaId).populate("comments")
    const comment = await db.Comment.findById(req.params.commentId).populate("author")
    res.json(comment)
}

exports.deleteMangaComment = async (req, res) => {
    const { mangaId, commentId } = req.params;
    await db.Comment.findByIdAndDelete(commentId);
    const updatedManga = await db.Manga.findByIdAndUpdate(mangaId, { $pull: { comments: commentId } })
    await updatedManga.save();
    console.log(updatedManga)
    res.json({ message: "DELETED!" })
}





module.exports = exports;