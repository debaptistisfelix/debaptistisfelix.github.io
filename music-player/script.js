const playerContainer = document.querySelector(".player-container")
const img = document.querySelector(".main-img");
const miniImg = document.getElementById("album-cover")
const title = document.getElementById("title");
const artist = document.getElementById("artist")
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress")
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
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
    var canvas = document.querySelector(".canvas");
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




