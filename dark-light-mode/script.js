const toggleSwitch = document.querySelector("input[type='checkbox']");
const toggleText = document.querySelector(".toggle-text");
const iconMode = document.querySelector("#icon-mode");
const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const nav = document.querySelector("#nav");
const textBox = document.querySelector("#text-box")


// Dark or Light Images
function imageMode(color) {
    img1.src = `img/undraw_proud_coder_${color}.svg`
    img2.src = `img/undraw_feeling_proud_${color}.svg`
    img3.src = `img/undraw_conceptual_idea_${color}.svg`
}

// Dark mode function
function darkMode() {
    nav.style.backgroundColor = "rgb(0 0 0 / 50%)"
    textBox.style.backgroundColor = "rgb(255 255 255 / 50%"
    iconMode.classList.replace("fa-sun", "fa-moon")
    toggleText.textContent = "Dark Mode"
    imageMode("dark");
}

// Light mode function
function lightMode() {
    nav.style.backgroundColor = "rgb(255 255 255 / 50%)"
    textBox.style.backgroundColor = "rgb(0 0 0 / 50%"
    iconMode.classList.replace("fa-moon", "fa-sun")
    toggleText.textContent = "Light Mode"
    imageMode("light")
}

function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        darkMode();

    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        lightMode();

    }
}


// event listener 
toggleSwitch.addEventListener("change", switchTheme)

// check local Storage for theme
const currentTheme = localStorage.getItem("theme");
// first let's check if there is a local Storage for theme
if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme)

    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
        darkMode();
    }
}