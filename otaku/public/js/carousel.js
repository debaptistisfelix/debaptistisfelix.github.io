const slides = document.querySelectorAll(".slide");
const btns = document.querySelectorAll(".gallery-btn");
let currentSlide = 1;


/* ------ Manual navigation -------- */

const manualNav = function (manual) {
    slides.forEach((slide) => {
        slide.classList.remove("active");
        btns.forEach((btn) => {
            btn.classList.remove("active");
        })
    })


    slides[manual].classList.add("active");
    btns[manual].classList.add("active");
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i
    })
})


/* -------- Autoplay navigation --------- */

const repeat = function (activaClass) {
    let active = document.getElementsByClassName("active");
    let i = 1;

    const repeater = () => {
        setTimeout(function () {

            [...active].forEach((activeSlide) => {
                activeSlide.classList.remove("active")
            })


            slides[i].classList.add("active");
            btns[i].classList.add("active")
            i++;

            if (slides.length == i) {
                i = 0;
            }
            if (i >= slides.length) {
                return;
            }
            repeater();
        }, 5000)
    }
    repeater()
}
repeat()
