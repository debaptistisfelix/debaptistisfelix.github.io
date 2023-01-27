const db = require("../model")

const isAuthor = async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await db.Comment.findById(commentId)
    if (!comment.author.equals(req.user._id)) {
        return res.redirect("error")
    }
    next();
}

module.exports = isAuthor;