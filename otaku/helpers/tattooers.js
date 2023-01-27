const db = require("../model")

exports.findTattooers = (req, res) => {
    db.Tattooer.find()
        .then(function (tattooers) {
            res.json(tattooers)
        })
        .catch(err => {
            res.send(err)
        })
};

exports.createTattooer = async (req, res) => {
    const newTattooer = await db.Tattooer.create(req.body.tattooer)
    const mobImg = req.files['tattooer[profileImg.mobileImg]'][0]
    newTattooer.profileImg.mobileImg = {
        url: mobImg.path,
        filename: mobImg.filename
    };
    const favManga = req.files['tattooer[favs.favManga.mangaImg]'][0]
    newTattooer.favs.favManga.mangaImg = {
        url: favManga.path,
        filename: favManga.filename
    };
    const favAnime = req.files['tattooer[favs.favAnime.animeImg]'][0]
    newTattooer.favs.favAnime.animeImg = {
        url: favAnime.path,
        filename: favAnime.filename
    };
    newTattooer.save();
    res.send(newTattooer)

};

exports.findTattooer = (req, res) => {
    db.Tattooer.findById(req.params.tattooerId)
        .then((foundTattooer) => {
            res.json(foundTattooer);
        })
        .catch(err => {
            res.send(err)
        })
};



exports.deleteTattooer = async (req, res) => {
    await db.Tattooer.findByIdAndDelete(req.params.tattooerId)
    res.json({ message: "DELETED" })

}



// MANGA TATTOOER COMMENTS HELPERS //

exports.findTattooerComments = async (req, res) => {
    const tattooer = await db.Tattooer.findById(req.params.tattooerId).populate({
        path: "comments",
        populate: {
            path: "author"
        }
    });
    const comments = tattooer.comments;
    res.json(comments)
}

exports.createTattooerComment = async (req, res) => {
    const tattooer = await db.Tattooer.findById(req.params.tattooerId).populate({
        path: "comments",
        populate: {
            path: "author"
        }
    });
    const newComment = await db.Comment.create(req.body);
    newComment.author = req.user._id;
    tattooer.comments.push(newComment);
    await newComment.save();
    await tattooer.save();
    const newCommentId = newComment._id;
    const populatedComment = await db.Comment.findById(newCommentId).populate("author");
    res.json(populatedComment);
}

exports.findTattooerComment = async (req, res) => {
    const tattooer = await db.Tattooer.findById(req.params.tattooerId).populate("comments");
    const foundComment = await db.Comment.findById(req.params.commentId).populate("author")
    res.json(foundComment);
}

exports.deleteTattooerComment = async (req, res) => {
    const { tattooerId, commentId } = req.params;
    await db.Comment.findByIdAndDelete(commentId);
    const updatedTattooer = await db.Tattooer.findByIdAndUpdate(tattooerId, { $pull: { comments: commentId } })
    await updatedTattooer.save();
    res.json({ message: "DELETED" })
}





// MANGA TATTOOER TATTOOES WORKS HELPERS ////

exports.findAllTattoos = async (req, res) => {
    const tattooer = await db.Tattooer.findById(req.params.tattooerId).populate("tattoos");
    const tattoos = tattooer.tattoos;
    res.json(tattoos)
}

exports.createTattoo = async (req, res) => {
    const tattooer = await db.Tattooer.findById(req.params.tattooerId).populate("tattoos");
    const newTattoo = await db.Tattoo.create(req.body.tattoo);
    const src = req.file
    newTattoo.imgSrc = {
        url: src.path,
        filename: src.filename
    }
    await newTattoo.save()
    tattooer.tattoos.push(newTattoo);
    await newTattoo.save();
    await tattooer.save();
    res.json(newTattoo);
}

exports.findTattoo = async (req, res) => {
    const tattooer = await db.Tattooer.findById(req.params.tattooerId).populate("tattoos");
    const tattoo = await db.Tattoo.findById(req.params.tattooId);
    res.json(tattoo)
}

exports.deleteTattoo = async (req, res) => {
    const { tattooerId, tattooId } = req.params;
    await db.Tattoo.findByIdAndDelete(tattooId);
    const updatedTattooer = await db.Tattooer.findByIdAndUpdate(tattooerId, { $pull: { tattoos: tattooId } })
    await updatedTattooer.save();
    res.json({ message: "DELETED" })
}

exports.likeTattoo = async (req, res) => {
    const { tattooerId, tattooId } = req.params;
    const tattooer = await db.Tattooer.findById(tattooerId);
    const tattoo = await db.Tattoo.findById(tattooId);
    tattoo.likes.push(req.user._id);
    await tattoo.save();
    await tattooer.save();
    res.json(tattoo)
}


exports.unlikeTattoo = async (req, res) => {
    const { tattooerId, tattooId } = req.params;
    const tattooer = await db.Tattooer.findById(tattooerId);
    const tattoo = await db.Tattoo.findById(tattooId);
    tattoo.likes.pop(req.user._id);
    await tattoo.save();
    await tattooer.save();
    res.json(tattoo)
}


module.exports = exports;