const Joi = require("joi");

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required()
    }).required()
})
/* 
module.exports.mangaSchema = Joi.object({
    manga: Joi.object({
        title: Joi.string().required(),
        scores: Joi.object({
            totalScore: Joi.number().required(),
            artScore: Joi.number().required(),
            characterScore: Joi.number().required(),
            storyScore: Joi.number().required()
        }),
        category: Joi.object({
            categ1: Joi.string().required(),
            categ2: Joi.string().required(),
            categ3: Joi.string().required()
        }),
        categoryTags: Joi.object({
            categTag1: Joi.string().required(),
            categTag2: Joi.string().required(),
            categTag3: Joi.string().required()
        }),
        infos: Joi.object({
            author: Joi.string().required(),
            status: Joi.string().required(),
            release: Joi.string().required(),
            mangavols: Joi.string().required(),
            longmangavols: Joi.string().required(),
            animeEps: Joi.string().required(),
            epDuration: Joi.string().required(),
            animeStudio: Joi.string().required()
        }),
        summary: Joi.string().required(),
        mangaVolumes: Joi.object({
            smallVol: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required()
            })
        }),
        panels: Joi.object({
            panelMobile: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required()
            }),
            panelTablet: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required()
            }),
            panelDesktop: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required()
            }),
        }),
        review: Joi.object({
            reviewTitle: Joi.string().required(),
            reviewSubtitle1: Joi.string().required(),
            reviewParag1: Joi.string().required(),
            reviewImg1: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required()
            }),
            reviewSubtitle2: Joi.string().required(),
            reviewParag2: Joi.string().required(),
            reviewImg2: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required(),
            }),
            reviewSubtitle3: Joi.string().required(),
            reviewParag3: Joi.string().required(),
            reviewImg3: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required()
            }),
        }),
        conclusion: Joi.string().required(),
        pros: Joi.object({
            pro1: Joi.string().required(),
            pro2: Joi.string().required(),
            pro3: Joi.string().required(),
        }),
        cons: Joi.object({
            con1: Joi.string().required(),
            con2: Joi.string().required(),
            con3: Joi.string().required(),
        }),
    })
})


module.exports.tattooerSchema = Joi.object({
    tattooer: Joi.object({
        name: Joi.string().required(),
        studio: Joi.string().required(),
        location: Joi.string().required(),
        exp: Joi.string().required(),
        month: Joi.string().required(),
        profileImg: Joi.object({
            mobileImg: Joi.object({
                url: Joi.string().required(),
                filename: Joi.string().required(),
            })
        }),
        descrip: Joi.string().required(),
        favs: Joi.object({
            favManga: Joi.object({
                mangaTitle: Joi.string().required(),
                mangaImg: Joi.object({
                    url: Joi.string().required(),
                    filename: Joi.string().required(),
                })
            }),
            favAnime: Joi.object({
                animeTitle: Joi.string().required(),
                animeImg: Joi.object({
                    url: Joi.string().required(),
                    filename: Joi.string().required(),
                }),
            })
        }),
        interview: Joi.object({
            interviewTitle: Joi.string().required(),
            interviewSubtitle: Joi.string().required(),
            question1: Joi.string().required(),
            answer1: Joi.string().required(),
            question2: Joi.string().required(),
            answer2: Joi.string().required(),
            question3: Joi.string().required(),
            answer3: Joi.string().required(),
            question4: Joi.string().required(),
            answer4: Joi.string().required(),
            question5: Joi.string().required(),
            answer5: Joi.string().required(),
        }),
        socials: Joi.object({
            tiktok: Joi.string().required(),
            insta: Joi.string().required(),
            fb: Joi.string().required(),

        }),
    })
})

module.exports.tattooSchema = Joi.object({
    tattoo: Joi.object({
        title: Joi.string().required(),
        imgSrc: Joi.object({
            url: Joi.string().required(),
            filename: Joi.string().required()
        })
    })
}) */