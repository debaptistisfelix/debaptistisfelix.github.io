const { tattooerSchema } = require("../schemas")
const ExpressError = require("../utils/ExpressError")



const validateTattooer = (req, res, next) => {
    const { error } = tattooerSchema.validate(req.body.tattooer);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports = validateTattooer;