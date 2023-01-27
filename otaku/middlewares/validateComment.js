const { commentSchema } = require("../schemas")
const ExpressError = require("../utils/ExpressError")



const validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body.comment);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports = validateComment;