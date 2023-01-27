const { tattooSchema } = require("../schemas")
const ExpressError = require("../utils/ExpressError")



const validateTattoo = (req, res, next) => {
    const { error } = tattooSchema.validate(req.body.tattoo);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports = validateTattoo;