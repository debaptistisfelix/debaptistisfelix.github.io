// to access the panelID 
const panelIdDiv = document.querySelector(".panel-id")
const panelId = panelIdDiv.innerText.trim();

const upvoteForm = document.querySelector(".upvote-div")
const upvoteScore = document.querySelector(".upvote-nr");
const downvoteForm = document.querySelector(".downvote-div");
const downvoteScore = document.querySelector(".downvote-nr");
//to access the User logged in
const currentUserDiv = document.querySelector(".currentUser-div")


// form variables to change to when you upvote or downvote the manga panel
const upvoteAction = `/api/panels/${panelId}/upvote`;
const removeUpvoteAction = `/api/panels/${panelId}/upvote/remove`;
const downvoteAction = `/api/panels/${panelId}/downvote`;
const removeDownvoteAction = `/api/panels/${panelId}/downvote/remove`;

const loginString = "login"

//spans used with bg black and low opacity to turn off the button that wasn't clicked
const upvoteTurnOff = document.querySelector(".up-turnoff");
const downvoteTurnOff = document.querySelector(".down-turnoff");



//SOCIALS LOGIC TO SHOW WHICH SOCIALS THE TATTOOERS HAS //
const tiktokLink = document.querySelector(".tiktok-link")
const tiktokHref = tiktokLink.getAttribute("href");

const instaLink = document.querySelector(".insta-link")
const instaHref = instaLink.getAttribute("href");

const fbLink = document.querySelector(".fb-link")
const fbHref = fbLink.getAttribute("href");


async function displaySocials(href, link) {
    if (href === "X") {
        link.classList.add("off-social")
    } else if (href.length > 1) {
        link.classList.add("on-social")
    }
}


displaySocials(fbHref, fbLink);
displaySocials(instaHref, instaLink);
displaySocials(tiktokHref, tiktokLink);




document.addEventListener("DOMContentLoaded", function () {
    fetchPanel();

    //if you press on the upvote BTN //
    upvoteForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        //if not logged in, redirect to Login page
        if (currentUserDiv === null) {
            console.log("you are not logged in")
            window.location.pathname = "/login"
            //if logged in 
        } else {
            console.log("you are logged in")
            //get the User._id
            const currentUserId = currentUserDiv.innerText.trim();
            //request the Panel to upvote
            const response = await axios.get(`/api/panels/${panelId}`);
            const panel = response.data;
            //check if panel.upvotes includes the user._id and use the according function to affect both the up and the down btns
            if (panel.upvotes.includes(currentUserId) && (!panel.downvotes.includes(currentUserId))) {
                removeUpvote();

            } else if ((!panel.upvotes.includes(currentUserId)) && (!panel.downvotes.includes(currentUserId))) {
                upvotePanel();

            } else if ((!panel.upvotes.includes(currentUserId)) && panel.downvotes.includes(currentUserId)) {
                await removeDownvote();
                upvotePanel();


            }
        }
    })

    downvoteForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        if (currentUserDiv === null) {
            console.log("you are not logged in")
            window.location.href = window.location.href + `${loginString}`
        } else {
            console.log("you are logged in")
            const currentUserId = currentUserDiv.innerText.trim();
            const response = await axios.get(`/api/panels/${panelId}`);
            const panel = response.data;
            if (panel.upvotes.includes(currentUserId) && (!panel.downvotes.includes(currentUserId))) {
                await removeUpvote();
                downvotePanel();

            } else if ((!panel.upvotes.includes(currentUserId)) && (!panel.downvotes.includes(currentUserId))) {
                downvotePanel();

            } else if ((!panel.upvotes.includes(currentUserId)) && panel.downvotes.includes(currentUserId)) {
                removeDownvote()

            }
        }
    })

})


async function fetchPanel() {
    const response = await axios.get(`/api/panels/${panelId}`);
    const panel = response.data;
    displayScores(panel);
}




function displayScores(panel) {
    upvoteScore.innerText = panel.upvotes.length;
    downvoteScore.innerText = panel.downvotes.length;
    //if the user is logged in we need to display his upvote or downvote
    if (currentUserDiv !== null) {
        const currentUserId = currentUserDiv.innerText.trim();
        // if user has already upvoted
        if (panel.upvotes.includes(currentUserId)) {
            //we turn off the downvote btn by adding the  Css class
            downvoteTurnOff.classList.add("downvote-turnoff")
            //if user has already downvoted
        } else if (panel.downvotes.includes(currentUserId)) {
            //we turn off the upvote btn by adding the Css class
            upvoteTurnOff.classList.add("upvote-turnoff")
        }
    }
}

async function upvotePanel() {
    //post request to insert User._id in the panel.upvote array
    const postedUpvote = await axios.post(`/api/panels/${panelId}/upvote`);
    //get request to get the updated panel with the user._id in it
    const response = await axios.get(`/api/panels/${panelId}`);
    const panel = response.data;
    //display the new score after the upvote 
    displayScores(panel);
    //change the action attribute of the form
    upvoteForm.setAttribute("action", removeUpvoteAction)
    //change the Css classes on both up and down btns
    upvoteTurnOff.classList.remove("upvote-turnoff")
    downvoteTurnOff.classList.add("downvote-turnoff")
}

async function downvotePanel() {
    const postedDownvote = await axios.post(`/api/panels/${panelId}/downvote`);
    const response = await axios.get(`/api/panels/${panelId}`);
    const panel = response.data;
    displayScores(panel);
    downvoteForm.setAttribute("action", removeDownvoteAction)
    upvoteTurnOff.classList.add("upvote-turnoff")
    downvoteTurnOff.classList.remove("downvote-turnoff")
}

async function removeUpvote() {
    const removedUpvote = await axios.post(`/api/panels/${panelId}/upvote/remove`);
    const response = await axios.get(`/api/panels/${panelId}`);
    const panel = response.data;
    displayScores(panel);
    upvoteForm.setAttribute("action", upvoteAction)
    downvoteTurnOff.classList.remove("downvote-turnoff")
}

async function removeDownvote() {
    const removedDownvote = await axios.post(`/api/panels/${panelId}/downvote/remove`);
    const response = await axios.get(`/api/panels/${panelId}`);
    const panel = response.data;
    displayScores(panel);
    downvoteForm.setAttribute("action", downvoteAction)


    upvoteTurnOff.classList.remove("upvote-turnoff")
}




const mangaTitle = document.querySelector(".short-version-title")
const longMangaTitle = document.querySelector(".long-version-title")

const fontSizeChanger = function (titleEl) {

    const title = titleEl.innerText.trim();
    if (title.length <= 10) {
        titleEl.classList.add("normal-font")
    } else if (title.length > 10 && title.length <= 20) {
        titleEl.classList.add("long-font");
    } else if (title.length > 20) {
        titleEl.classList.add("longest-font");
    }
}

fontSizeChanger(mangaTitle)
fontSizeChanger(longMangaTitle)






