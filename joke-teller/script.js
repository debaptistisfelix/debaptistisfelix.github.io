const audioElement = document.getElementById('audio');
const button = document.getElementById("button");




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




