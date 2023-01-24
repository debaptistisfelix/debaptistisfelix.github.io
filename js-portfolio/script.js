AOS.init({
    delay: 0.2,
    easing: 'ease',
    once: false,
    duration: 800
});

// Animated Navigation Java Script

const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");
const navItems = [nav1, nav2, nav3, nav4, nav5];

// controll Navigation Animation
function navAnimation(direction1, direction2) {
    navItems.forEach((nav, i) => {
        nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`)
    })
}

function toggleNav() {
    // Toggle: Menu Bars Open/Closed
    menuBars.classList.toggle("change");
    // Toggle: Menu Active 
    overlay.classList.toggle("overlay-active")
    if (overlay.classList.contains("overlay-active")) {
        // Animate In Overlay
        overlay.classList.replace("overlay-slide-left", "overlay-slide-right")
        // Animate In nav items
        navAnimation("out", "in")
    } else {
        // Animate Out Overlay
        overlay.classList.replace("overlay-slide-right", "overlay-slide-left")
        // Animate out nav items
        navAnimation("in", "out")
    }
}

// Event Listeners
menuBars.addEventListener("click", toggleNav)
navItems.forEach((nav) => {
    nav.addEventListener("click", toggleNav)
})













// Music Player JavaScript
const musicTitleBox = document.querySelector(".music-titles-box");
const tabletMusicTitle = document.getElementById("tablet-music-title");
const musicTitle = document.querySelector(".music-player-title");
const musicSubtitle = document.querySelector(".music-player-subtitle")
const musicSubtMini = document.querySelector(".music-subtitle-mini")
const musicTitle1 = document.querySelector(".music-player-title1")
const musicSkill = document.querySelectorAll(".music-skill");
const musicParags = document.querySelectorAll(".music-parags")
const playerContainer = document.querySelector(".music-player-container")
const img = document.querySelector(".music-main-img");
const miniImg = document.getElementById("album-cover")
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist")
const music = document.querySelector("audio");
const progressContainer = document.getElementById("music-progress-container");
const progress = document.getElementById("music-progress")
const currentTimeEl = document.getElementById("music-current-time");
const durationEl = document.getElementById("music-duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const btnArray = [prevBtn, playBtn, nextBtn]

// Music
const songs = [
    {
        name: "Song1(ParallelParking)",
        displayName: "Parallel Parking",
        artist: "Arden Jones"
    },
    {
        name: "Song2(NovemberRegen)",
        displayName: "November Regen",
        artist: "Asche ft. Genetikk"
    },
    {
        name: "Song4(careless)",
        displayName: "Careless",
        artist: "Arden Jones"
    },
    {
        name: "Song3(FREIHEIT)",
        displayName: "Freiheit",
        artist: "CRO"
    },
    {
        name: "Song5(toxiccrush)",
        displayName: "Toxic Crush",
        artist: "Arden Jones"
    }
]


// Check if music is playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Play or Pause event Listener
playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
})

// update DOM
function loadSong(song) {
    title.textContent = song.displayName,
        artist.textContent = song.artist,
        music.src = `music/${song.name}.mp3`,
        img.src = `img/${song.name}.jpeg`
    miniImg.src = `img/${song.name}.jpeg`
}

// Current SOng 
let songIndex = 0;

// Next song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load - Select first song
loadSong(songs[songIndex])

// Update Progress Bar
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // delay switching duration element yo avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set progress bar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}



// Find the most frequent rgb combo in the array
function mostFrequent(arr) {
    let maxCount = 0;
    let mostFreqElem;

    for (let i = 0; i < arr.length; i++) {
        let count = 0; {
            for (let j = 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    count++
                }
            }
            if (count > maxCount) {
                maxCount = count;
                mostFreqElem = arr[i];
            }
        }
    }
    return mostFreqElem;
}


function buildRGB(imageData) {
    const rgbValues = [];
    // loop over the array of all the pixels every 4 to get the rgb values
    for (let i = 0; i < imageData.length; i += 4) {
        const rgb = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
        };
        rgbValues.push(rgb);
    }
    // find the most frequent rgb combination in the array
    const color = mostFrequent(rgbValues)
    return color
}

// Change the colors of the element of the music  player
function changeColors(color, compleColor) {
    // Text Block color changing
    musicTitleBox.style.backgroundColor = `rgba(${compleColor.r}, ${compleColor.g}, ${compleColor.b}, 1)`
    musicTitle.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    musicTitle1.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    tabletMusicTitle.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    musicSkill.forEach((skill) => {
        skill.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    })
    musicSubtMini.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    musicParags.forEach((parag) => {
        parag.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    })

    // Player color changing
    for (let btn of btnArray) {
        btn.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    }
    playerContainer.style.backgroundColor = `rgba(${compleColor.r}, ${compleColor.g}, ${compleColor.b}, 1)`
    /* playerContainer.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)` */
    title.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    artist.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    currentTimeEl.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    durationEl.style.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    progress.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
    progressContainer.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`
}


async function makeBase() {
    var canvas = document.querySelector(".music-canvas");
    context = canvas.getContext("2d");
    base_image = document.querySelector("#album-cover")
    canvas.width = base_image.width;
    canvas.height = base_image.height;
    // when img is loaded
    base_image.onload = () => {
        // Draw canvas and get all the pixels inside
        context.drawImage(base_image, 0, 0, canvas.width, canvas.height);
        const imageDataArr = context.getImageData(0, 0, canvas.width, canvas.height);
        const imageData = imageDataArr.data;
        // get dominant color of the image
        const dominantColor = buildRGB(imageData)
        // declare variable for darker version of Dominant color 
        const complColor = {}
        complColor.r = `${dominantColor.r}` * 0.25;
        complColor.g = `${dominantColor.g}` * 0.25;
        complColor.b = `${dominantColor.b}` * 0.25;
        // change the colors of the elements of the Music player
        changeColors(dominantColor, complColor)
    }

}

makeBase();

// event listeners 
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong)
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar)












// JOke teller JavaScript


const audioElement = document.getElementById('joke-audio');
const button = document.getElementById("joke-button");




// Disable/enable Button

function toggleButton() {
    button.disabled = !button.disabled;
}


function test(joke) {
    VoiceRSS.speech({
        key: '8b6b2027d286402291cd45ddf4dbbe7b',
        src: `${joke}`,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}



// get Joke from Joke API

const JokeAPI = "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"

async function getJokes() {
    try {
        const response = await fetch(JokeAPI);
        const item = await response.json();
        if (item.setup && item.delivery) {
            const part1 = item.setup;
            const part2 = item.delivery;
            const joke = `${part1} ${part2}`
            toggleButton();
            test(joke);
        } else if (item.joke) {
            const joke = item.joke;
            toggleButton()
            test(joke)
        }
    } catch (e) {
        console.log(e);
    }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton)







// CALCULATOR JAVASCRIPT

const calculator = document.querySelector(".calculator");
const lightBtn = document.querySelector(".light-box");
const darkBtn = document.querySelector(".dark-box")
const calculatorDisplay = document.getElementById("calculator-display");
const inputBtns = calculator.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let isDarkMode = false;
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;



function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        //    if current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number
    }
}

function addDecimal() {
    // if operator pressed, don' add decimal 
    if (awaitingNextValue) return
    // if no decimal, add one
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second values depending on operator
const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber

};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // to prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;

    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;

}

// Event Listeners for numbers, operaotrs, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", () => addDecimal());
    }
})

// Reset display
function resetAll() {
    firstValue = 0;
    operator = "";
    awaitingNextValue = false;
    calculatorDisplay.textContent = "0";
}

// Event listener
clearBtn.addEventListener("click", resetAll);




function switchTheme() {
    if (!isDarkMode) {
        document.documentElement.setAttribute("data-theme", "dark")
        isDarkMode = true;
        lightBtn.classList.add("turned-off")
        darkBtn.classList.replace("turned-off", "turned-on")
    } else {
        document.documentElement.setAttribute("data-theme", "light")
        isDarkMode = false;
        darkBtn.classList.add("turned-off")
        lightBtn.classList.replace("turned-off", "turned-on")

    }

}

lightBtn.addEventListener("click", switchTheme);
darkBtn.addEventListener("click", switchTheme);











// Video player JavaScript


const player = document.querySelector(".video-player")
const video = document.querySelector("video");
const progressRange = document.querySelector(".video-progress-range")
const progressBar = document.querySelector(".video-progress-bar");
const videoPlayBtn = document.getElementById("video-play-btn");
const nextVideoBtn = document.getElementById("video-next-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".video-volume-range");
const volumeBar = document.querySelector(".video-volume-bar");
const currentTime = document.querySelector(".video-time-elaps");
const duration = document.querySelector(".video-time-duration");
const gearBtn = document.querySelector("#video-gear");
const videoOptions = document.querySelector(".video-options");
const cinemaCurtain = document.querySelector(".cinema-curtain");
const cinemaToggle = document.querySelector("input[type='checkbox']")
const speed = document.querySelector(".video-player-speed");
const fullscreenBtn = document.querySelector(".video-fullscreen");
const playlistContainer = document.querySelector(".playlist-container")
const trailers = document.querySelectorAll(".trailer-block");




const videos = [
    {
        name: "trailer1(Flavour)",
        poster: "trailer1Img"
    },
    {
        name: "trailer2(whiskers)",
        poster: "trailer2Img"
    },
    {
        name: "trailer3(Silent)",
        poster: "trailer3Img"
    }
];

let trailerIndex = 0;
let trailerBlocksIndex = 0

function loadTrailer(trailer) {
    video.src = `video/${trailer.name}.mp4`
}

function loadInfos(trailer) {
    const poster = trailer.querySelector(".trailer-img");
    const trailerTextBlock = trailer.querySelector(".ttb")
    const posterContainer = trailer.querySelector(".trailer-img-cont");
    const posterCurtain = trailer.querySelector(".off-trailer")

    trailer.classList.replace("trailer", "trailer-playing");
    posterContainer.classList.replace("poster-container", "poster-container-playing")
    poster.classList.replace("poster", "poster-playing");
    trailerTextBlock.classList.replace("trailer-text-block", "trailer-text-block-playing")
    posterCurtain.classList.add("no-off-trailer")
}

function closeInfos(trailer) {
    const poster = trailer.querySelector(".trailer-img");
    const trailerTextBlock = trailer.querySelector(".ttb")
    const posterContainer = trailer.querySelector(".trailer-img-cont");
    const posterCurtain = trailer.querySelector(".off-trailer")

    trailer.classList.replace("trailer-playing", "trailer");
    posterContainer.classList.replace("poster-container-playing", "poster-container")
    poster.classList.replace("poster-playing", "poster");
    trailerTextBlock.classList.replace("trailer-text-block-playing", "trailer-text-block")
    posterCurtain.classList.remove("no-off-trailer")
}

function nextTrailer() {
    trailerIndex++;
    trailerBlocksIndex++;
    if (trailerIndex > videos.length - 1 && trailerBlocksIndex > trailers.length - 1) {
        trailerIndex = 0;
        trailerBlocksIndex = 0;
        closeInfos(trailers[trailerBlocksIndex + 2])
    }
    loadTrailer(videos[trailerIndex])
    loadInfos(trailers[trailerBlocksIndex])
    closeInfos(trailers[trailerBlocksIndex - 1])

}



// Onload put the first trailer in the video-player
loadTrailer(videos[trailerIndex]);

loadInfos(trailers[trailerBlocksIndex])

// Event Listeners
nextVideoBtn.addEventListener("click", nextTrailer);

playlistContainer.addEventListener("click", (e) => {
    if (trailers[0].contains(e.target)) {
        trailerIndex = 0;
        trailerBlocksIndex = 0
        /*  loadTrailer(videos[0]);
         loadInfos(trailers[0]) */
    } else if (trailers[1].contains(e.target)) {
        trailerIndex = 1;
        trailerBlocksIndex = 1;
        /* loadTrailer(videos[1]);
        loadInfos(trailers[1]) */
    } else if (trailers[2].contains(e.target)) {
        trailerIndex = 2;
        trailerBlocksIndex = 2;
        /*   loadTrailer(videos[2]);
          loadInfos(trailers[2]) */
    }
    trailers.forEach((trailer) => {
        closeInfos(trailer)
    })
    loadTrailer(videos[trailerIndex])
    loadInfos(trailers[trailerBlocksIndex])

})



// Play & Pause ----------------------------------- //
function showPlayIcon() {
    videoPlayBtn.classList.replace("fa-pause", "fa-play")
    videoPlayBtn.setAttribute("title", "Play")
}

function togglePlay() {
    if (video.paused) {
        video.play();
        videoPlayBtn.classList.replace("fa-play", "fa-pause");
        videoPlayBtn.setAttribute("title", "Pause")
    } else {
        video.pause();
        showPlayIcon();
    }
}

// On video end, show play button icon
video.addEventListener("ended", () => {
    showPlayIcon();
    nextTrailer()
})


// Progress Bar ---------------------------------- //

// Calculate time display format

function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// Update progress bar as the video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume bar 
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volum up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume;
    // Change icon depending on volume
    volumeIcon.className = "";
    if (volume > 0.7) {
        volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (volume > 0) {
        volumeIcon.classList.add("fas", "fa-volume-down");
    } else {
        volumeIcon.classList.add("fas", "fa-volume-off")
    }
    lastVolume = volume;
}

// Mute/unmute
function toggleMute() {
    volumeIcon.className = "";
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add("fas", "fa-volume-mute");
        volumeIcon.setAttribute("title", "unmute")
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`
        volumeIcon.classList.add("fas", "fa-volume-up");
        volumeIcon.setAttribute("title", "mute")
    }
}


// Open/Close Option div

function toggleOptions() {
    if (videoOptions.classList.contains("no-options")) {
        videoOptions.classList.replace("no-options", "show-options")
        gearBtn.classList.contains("gear-close-rotate") ? gearBtn.classList.replace("gear-close-rotate", "gear-open-rotate") : gearBtn.classList.add("gear-open-rotate");
    } else {
        videoOptions.classList.replace("show-options", "no-options")
        gearBtn.classList.replace("gear-open-rotate", "gear-close-rotate")
    }
}

/* window.document.addEventListener("click", (e) => {
    if (e.target !== videoOptions) {
        videoOptions.classList.replace("show-options", "no-options")
        gearBtn.classList.replace("gear-open-rotate", "gear-close-rotate")
    }
}) */

gearBtn.addEventListener("click", toggleOptions)


// Toggle Cinema Mode

function toggleCinemaMode(e) {
    e.target.checked ? cinemaCurtain.classList.add("cinema-on") : cinemaCurtain.classList.remove("cinema-on");
}

cinemaToggle.addEventListener("change", toggleCinemaMode);


// Change Playback Speed -------------------- //
function changeSpeed() {
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add("video-fullscreen-set");
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove("video-fullscreen-set");
}

let fullscreen = false;

// toggle full screen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen
}

// Event Listeners
videoPlayBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);

