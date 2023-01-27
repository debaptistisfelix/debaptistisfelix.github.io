const mongoose = require("mongoose");
mongoose.set("debug", true);

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((err) => {
        console.log(err);
        console.log("Mongo Connecction ERROR")
    })

mongoose.Promise = Promise;

exports.Manga = require("./manga");

exports.Tattooer = require("./tattooer");

exports.Comment = require("./comment");

exports.Panel = require("./panel");

exports.User = require("./user");

exports.Tattoo = require("./tattoo");

module.exports = exports;

