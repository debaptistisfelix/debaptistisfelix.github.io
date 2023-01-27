const slides = document.querySelectorAll(".slide");
const btns = document.querySelectorAll(".gallery-btn");
const blockContainer = document.querySelectorAll(".blocks-container")
const blocks = document.querySelectorAll(".block")
const shines = document.querySelectorAll(".shine")
const designImg = document.querySelector(".categ-img")


const introBtn = document.querySelector("#intro-btn")
const adventureBtn = document.querySelector("#adventure-btn");
const sportBtn = document.querySelector("#sport-btn");
const ecchiBtn = document.querySelector("#ecchi-btn");
const romanticBtn = document.querySelector("#romantic-btn");
const horrorBtn = document.querySelector("#horror-btn");
const tragedyBtn = document.querySelector("#tragedy-btn");
const sliceBtn = document.querySelector("#slice-btn");
const comedyBtn = document.querySelector("#comedy-btn");
const actionBtn = document.querySelector("#action-btn");

const imgSlider = document.querySelector(".img-slider");
const ninetyDiv = document.querySelector(".ninety-div");
const categTitle = document.querySelector(".categ-page-title");
const categTags = document.querySelectorAll(".categ-tags");

const randomBlocks = document.querySelectorAll(".random-block")
const randomShines = document.querySelectorAll(".random-shine");
const randomCategTags = document.querySelectorAll(".random-categ-tags")
const introDiv = document.querySelector(".lost-zoro-div")

const randomBtn = document.querySelector(".random-btn")
const introImg = document.querySelector(".intro-img");
const introSlide = document.querySelector("#intro-slide");



let currentSlide = 1;





// Function to count title length and change font accordingly


// for all Manga Blocks in every category
const fontChanger = function (container) {
    const mangaTitles = container.querySelectorAll(".manga-title")
    for (let mangaTitle of mangaTitles) {
        if (mangaTitle.innerText.length >= 15 && mangaTitle.innerText.length < 30) {
            mangaTitle.classList.add("longest-title");
        } else if (mangaTitle.innerText.length > 10 && mangaTitle.innerText.length < 15) {
            mangaTitle.classList.add("long-title");
        } else if (mangaTitle.innerText.length >= 30) {
            mangaTitle.classList.add("super-longest-title");
        }
    }
}

for (let block of blocks) {
    fontChanger(block);
}

// only for the title of the random manga 

const randomFontChanger = function (container) {
    const randomTitles = container.querySelectorAll(".random-manga-title")
    for (let randomTitle of randomTitles) {
        if (randomTitle.innerText.trim().length > 15) {
            randomTitle.classList.add("random-longest-title");
        } else if (randomTitle.innerText.trim().length > 10 && randomTitle.innerText.trim().length <= 15) {
            randomTitle.classList.add("random-long-title");
        }
    }
}

randomFontChanger(introDiv);

// function to alphabetically sort the mangas for each category
function sortList(x, y) {
    var categContainer = x;
    var categBlocks = y;
    // If conatiner contains any manga blocks
    if (categBlocks.length) {
        // create an array out of the manga blocks
        categBlocks = Array.from(categBlocks); // or [].slice.apply(columns) if Array.from() is not available
        // sort the titles of the manga blocks, comparing 2 manga titles each time
        categBlocks.sort(function (leftColumn, rightColumn) {
            var leftTitle = leftColumn.querySelector(".mt").textContent;
            var rightTitle = rightColumn.querySelector(".mt").textContent;
            if (leftTitle < rightTitle) { return -1; }
            if (leftTitle > rightTitle) { return 1; }
            return 0;
        });
        //Append the mangas in alphabetical order in the container again
        categBlocks.forEach(function (categBlock) {
            categContainer.appendChild(categBlock);
        });
    }
}


// loop over every category container
for (let container of blockContainer) {
    // Select all the manga blocks inside the category container
    const containerBlocks = container.querySelectorAll(".block");
    // sort them
    sortList(container, containerBlocks)
}



/* ------ Manual navigation -------- */

const manualNav = function (manual) {
    slides.forEach((slide) => {
        slide.classList.remove("active");
        btns.forEach((btn) => {
            btn.classList.remove("active", "bubbleBtn");
        })
    })


    slides[manual].classList.add("active");
    btns[manual].classList.add("active", "bubbleBtn");
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i
    })
})



// Css Animations when manga blocks appear

const animationLoader = (catTags, shines, class1, class2) => {
    for (let catTag of catTags) {
        catTag.classList.remove(`${class1}`);
        setTimeout(() => {
            catTag.classList.add(`${class1}`)
        }, 10)
    }
    for (let shine of shines) {
        shine.classList.remove(`${class2}`);
        setTimeout(() => {
            shine.classList.add(`${class2}`)
        }, 10)
    }
}

animationLoader(randomCategTags, randomShines, "random-growing", "random-shining");



const getRandomManga = function () {
    for (let randomBlock of randomBlocks) {
        randomBlock.classList.remove("show-random-block")
    }
    introImg.src = "/images/Categories/randomWallpaperGokura.jpg";
    setTimeout(() => {
        const randomN = Math.floor(Math.random() * randomBlocks.length)
        randomBlocks[randomN].classList.add("show-random-block", "random-block-flipping");
        animationLoader(randomCategTags, randomShines, "random-growing", "random-shining");
    }, 250)
}




randomBtn.addEventListener("click", getRandomManga)




/* ------- COLOR CHANGING FUNCTION -------- */

const longerSlider = function () {
    imgSlider.classList.replace("short-hight", "long-hight")

}

const shorterSlider = function () {

    imgSlider.classList.replace("long-hight", "short-hight")
}




const changeToIntro = function () {
    categTitle.classList.remove("orange-font", "blue-font", "pink-font", "red-font", "purple-font", "lightb-font", "yellow-font", "green-font", "darkgreen-font")
    ninetyDiv.classList.remove("orange-tbg", "blue-tbg", "pink-tbg", "red-tbg", "purple-tbg", "lightb-tbg", "yellow-tbg", "green-tbg", "darkgreen-tbg")
    ninetyDiv.classList.remove("ninety-div-box-shadow");
}

introBtn.addEventListener("click", () => {
    changeToIntro();
    shorterSlider();
})




function changeColors(fontColor, tbgColor) {
    // let declare the 2 colors array
    let fontColorArray = ["darkgreen-font", "blue-font", "pink-font", "red-font", "purple-font", "lightb-font", "yellow-font", "green-font", "orange-font"]
    let bgColorArray = ["darkgreen-tbg", "blue-tbg", "pink-tbg", "red-tbg", "purple-tbg", "lightb-tbg", "yellow-tbg", "green-tbg", "orange-tbg"]
    // We remove the color we want from font color array
    const fontColorIndex = fontColorArray.indexOf(fontColor);
    const color = fontColorArray.splice(fontColorIndex, 1);
    // Remove any other font color 
    for (let col of fontColorArray) {
        categTitle.classList.remove(`${col}`)
    }
    // Add only the desired color font
    categTitle.classList.add(`${color}`);

    //    we remove the bgColor we want from the bg color array
    const tbgColorIndex = bgColorArray.indexOf(tbgColor);
    const bgColor = bgColorArray.splice(tbgColorIndex, 1);
    // Remove any other bg colors
    for (let BGcol of bgColorArray) {
        ninetyDiv.classList.remove(`${BGcol}`);

    }
    // Asdd only desired bg color
    ninetyDiv.classList.add(`${bgColor}`);
    ninetyDiv.classList.add("ninety-div-box-shadow")
}

adventureBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining")
    changeColors("orange-font", "orange-tbg");
})

sportBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("blue-font", "blue-tbg");
})

ecchiBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("pink-font", "pink-tbg");
})

romanticBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("red-font", "red-tbg");
})

horrorBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("purple-font", "purple-tbg");
})

tragedyBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("lightb-font", "lightb-tbg");
})

sliceBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("green-font", "green-tbg");
})

comedyBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("yellow-font", "yellow-tbg");
})

actionBtn.addEventListener("click", () => {
    longerSlider();
    animationLoader(categTags, shines, "growing", "shining");
    changeColors("darkgreen-font", "darkgreen-tbg");
})

