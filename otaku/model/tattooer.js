const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TattooerSchema = new Schema({
    name: String,
    studio: String,
    location: String,
    exp: String,
    month: String,
    profileImg: {
        mobileImg: {
            url: String,
            filename: String
        }
    },
    descrip: String,
    favs: {
        favManga: {
            mangaTitle: String,
            mangaImg: {
                url: String,
                filename: String
            }
        },
        favAnime: {
            animeTitle: String,
            animeImg: {
                url: String,
                filename: String
            },
        }
    },
    interview: {
        interviewTitle: String,
        interviewSubtitle: String,
        question1: String,
        answer1: String,
        question2: String,
        answer2: String,
        question3: String,
        answer3: String,
        question4: String,
        answer4: String,
        question5: String,
        answer5: String,
    },
    socials: {
        tiktok: String,
        insta: String,
        fb: String

    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    tattoos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tattoo"
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now
    }
})

const Tattooer = mongoose.model("Tattooer", TattooerSchema);

module.exports = Tattooer;