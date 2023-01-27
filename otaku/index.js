if (process.env.NODE_env !== "production") {
    require("dotenv").config();
}

const dbUrl = process.env.DB_URL

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const db = require("./model")
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize")
const isAdmin = require("./middlewares/isAdmin")
const isLoggedIn = require("./middlewares/isLoggedIn")
const isAuthor = require("./middlewares/isAuthor")
const returnTo = require("./middlewares/returnTo")
const MongoDBStore = require("connect-mongo")





//require all the routes needed from routes dir //
const mangaRoutes = require("./routes/mangas")
const tattooerRoutes = require("./routes/tattooers")
const panelRoutes = require("./routes/panels");
const userRoutes = require("./routes/users");
const pathPagesRoutes = require("./routes/pathPages");
const adminRoutes = require("./routes/admin");




//set up path for /views dir //
app.set("views", path.join(__dirname + "/views"));

//to use ejs //
app.set("view engine", "ejs")
app.engine("ejs", ejsMate);

//set up path for /public dir //
app.use(express.static(path.join(__dirname + "/public")))
app.use(mongoSanitize())
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SECRET
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR")
})


const sessionConfig = {
    store,
    name: "ramenSoup",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        /* secure:true, */
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());




const scriptSrcUrls = [
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/flexington/"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://fonts.googleapis.com/",
    "https://fonts.gstatic.com/",
    "https://kit.fontawesome.com/2ca980d5f1.js",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/flexington/",
    " https://cdnjs.cloudflare.com/"
];
const connectSrcUrls = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://res.cloudinary.com/flexington/",
    "https://ka-f.fontawesome.com/"
];

const fontSrcUrls = ["https://fonts.gstatic.com/",
    "https://fonts.googleapis.com/",
    "https://res.cloudinary.com/flexington/",
    "https://ka-f.fontawesome.com/"
]


app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-hashes'", ...scriptSrcUrls],
            scriptSrcAttr: ["'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/flexington/",

            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);



app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()))

passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());




app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})





app.use("/api/mangas", mangaRoutes);
app.use("/api/tattooers", tattooerRoutes);
app.use("/api/panels", panelRoutes);
app.use("/", userRoutes);
app.use("/", pathPagesRoutes)
app.use("/", adminRoutes);



app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong!"
    res.status(statusCode).render("error", { err })
})


app.listen(3030, () => {
    console.log("Connected to PORT 3030");
})