const flashAlert = document.querySelector(".success-alert")
const closingBtn = document.querySelector(".success-closing-x");

function closeAlert() {
    if (flashAlert) {
        flashAlert.classList.add("cancel-alert")
    } else return

}

if (closingBtn) {
    closingBtn.addEventListener("click", closeAlert)
}

const errorAlert = document.querySelector(".error-alert")
const errorClosingBtn = document.querySelector(".error-closing-x");

function closeErrorAlert() {
    if (errorAlert) {
        errorAlert.classList.add("error-cancel-alert")
    } else return

}

if (errorClosingBtn) {
    errorClosingBtn.addEventListener("click", closeErrorAlert)
}



const userFlashAlert = document.querySelector(".user-success-alert");
const userClosingBtn = document.querySelector(".user-success-closing-x");

function closeUserAlert() {
    userFlashAlert.classList.add("user-cancel-alert");
}

if (userClosingBtn) {
    userClosingBtn.addEventListener("click", closeUserAlert)
}




const userErrorFlashAlert = document.querySelector(".user-error-alert");
const userErrorClosingBtn = document.querySelector(".user-error-closing-x");

function closeErrorUserAlert() {
    userErrorFlashAlert.classList.add("user-error-cancel-alert");
    console.log("Shit")
}

if (userErrorClosingBtn) {
    userErrorClosingBtn.addEventListener("click", closeErrorUserAlert)
}
