const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PanelSchema = new Schema({
    panelSrc: {
        url: String,
        filename: String
    },
    fromManga: {
        mangaTitle: String,
        mangaScore: Number,
        MangaVol: {
            url: String,
            filename: String
        },
        release: String,
        LongMangaVols: String,
        status: String,
        mangaId: String,
        categoryTags: {
            categTag1: String,
            categTag2: String,
            categTag3: String,
        }
    },
    upvotes: [String],
    downvotes: [String],
    createdDate: {
        type: Date,
        default: Date.now
    },
    week: Number
})

const Panel = mongoose.model("Panel", PanelSchema);

module.exports = Panel;
