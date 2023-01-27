const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TattooSchema = new Schema({
    title: String,
    imgSrc: {
        url: String,
        filename: String
    },
    likes: [String]
})

Tattoo = mongoose.model("Tattoo", TattooSchema);
module.exports = Tattoo