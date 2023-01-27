const { mangaSchema } = require("../schemas")
const ExpressError = require("../utils/ExpressError");

const validateManga = (req, res, next) => {
    const { error } = mangaSchema.validate(req.body.manga);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports = validateManga;