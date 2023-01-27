const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
    title: String,
    scores: {
        totalScore: Number,
        usersScore: Number,
        artScore: Number,
        characterScore: Number,
        storyScore: Number
    },
    category: {
        categ1: String,
        categ2: String,
        categ3: String
    },
    categoryTags: {
        categTag1: String,
        categTag2: String,
        categTag3: String,
    },
    infos: {
        author: String,
        status: String,
        release: String,
        mangavols: String,
        longmangavols: String,
        animeEps: String,
        epDuration: String,
        animeStudio: String
    },
    summary: String,
    mangaVolumes: {
        smallVol: {
            url: String,
            filename: String
        }
    },
    panels: {
        panelMobile: {
            url: String,
            filename: String
        },
        panelTablet: {
            url: String,
            filename: String
        },
        panelDesktop: {
            url: String,
            filename: String
        },
    },
    review: {
        reviewTitle: String,
        reviewSubtitle1: String,
        reviewParag1: String,
        reviewImg1: {
            url: String,
            filename: String
        },
        reviewSubtitle2: String,
        reviewParag2: String,
        reviewImg2: {
            url: String,
            filename: String
        },
        reviewSubtitle3: String,
        reviewParag3: String,
        reviewImg3: {
            url: String,
            filename: String
        },
    },
    conclusion: String,
    pros: {
        pro1: String,
        pro2: String,
        pro3: String
    },
    cons: {
        con1: String,
        con2: String,
        con3: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

const Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;
