


// use page Url to get the mangaId of the review //
const mangaIdSpan = document.querySelector(".manga-id-span")
const mangaId = mangaIdSpan.innerText.trim();

const commentsContainer = document.querySelector(".comments-container");
const commentBodyInput = document.querySelector("#comment-textarea");
const commentRangeInput = document.querySelector("#range-input")
const commentDeletBtn = document.querySelector(".comment-delete-btn")
const commentForm = document.querySelector(".comments-form")
const deleteForm = document.querySelector("#delete-form");
const rangeOutput = document.querySelector("#rangevalue");
const commentsCount = document.querySelector(".comments-count")




// this function will happen as soon as the HTML of the page is loaded//
document.addEventListener("DOMContentLoaded", function () {
    fetchComments();

    //post User Scores 
    updateUserScore();

    const currentUserObj = document.querySelector(".user-div")
    if (currentUserObj === null) {
        console.log("User not logged in!!!!")
    } else {
        console.log("User logged in");
        const currentUser = currentUserObj.innerText.trim();
        const currentUserIdDiv = document.querySelector(".user_id-div")
        const currentUserId = currentUserIdDiv.innerText.trim();
        postComment();
        deleteComment()
    }


})


const postComment = async function () {
    if (commentForm) {
        commentForm.addEventListener("submit", async function (e) {
            //prevent form from refreshing page when submitted
            e.preventDefault();
            //create comment 
            createComment();
        });
    }
}

const deleteComment = async function () {
    commentsContainer.addEventListener("submit", async function (e) {
        //prevent form from refreshing page when submitted
        e.preventDefault();
        //get the commentId from the custom attribute added in the addComment function //
        const commentId = e.target.getAttribute("data-commentId")
        //select the commentBlock to delete
        const commentBlock = (e.target.parentNode)
        //delete comment from database
        await axios.delete(`/api/mangas/${mangaId}/comments/${commentId}`);
        //remove commentBlock from commentsContainer
        commentBlock.remove();
        //update Users Score
        updateUserScore();
    })

}

//function to fetch all the comments related to the mangaReview//
async function fetchComments() {
    const response = await axios.get(`/api/mangas/${mangaId}/comments`);
    const comments = response.data
    //add comments to page //
    addComments(comments);
}

async function updateUserScore() {
    const response = await axios.get(`/api/mangas/${mangaId}/comments`);
    const comments = response.data
    const userScore = document.querySelector(".users-score")
    let sum = 0;
    if (!comments.length) {
        userScore.innerText = "N/A"
        commentsCount.innerText = 0;
    } else {
        for (let comment of comments) {
            sum += comment.rating;
        }
        let avg = (sum / comments.length).toFixed(1);
        userScore.innerHTML = `${avg} <i class="fa-sharp fa-solid fa-star"></i>`
        commentsCount.innerText = comments.length;
    }

}


// function to add all the Comments to the MangaReview //
function addComments(comments) {
    //loop comments and use addComments() on each one to add it to the page //
    for (let comment of comments) {
        addComment(comment);
    }
}


function addCommentsForNotUsers(comment) {
    const newComment = document.createElement("div");
    console.log("User not logged in!!!!")
    newComment.innerHTML = `
        <div class="user-time-div">
        <h3 class="comment-user">
       ${comment.author.username}
       </h3>
       <h4 class="time-stamp">rated this Manga ${comment.rating} <i class="fa-sharp fa-solid fa-star"></i></h4>
       </div>
       <div class="actual-comment-div">
       <p class="actual-comment">
       ${comment.body}
       </p>
       </div>
       <form data-commentId="${comment._id}" class="delete-div" id="delete-form" method="POST" action="api/mangas/${mangaId}/comments/${comment._id}?_method=DELETE">
       </form>`
    // add CSS class to give style to comment block//
    newComment.classList.add("comment-block")
    //append comment block to commentsContainer
    commentsContainer.prepend(newComment);
}

function addCommentsForUserAuthor(comment) {
    const newComment = document.createElement("div");
    console.log("User logged in and author of comment")
    newComment.innerHTML = `
<div class="user-time-div">
<h3 class="comment-user">
${comment.author.username}
</h3>
<h4 class="time-stamp">rated this Manga ${comment.rating} <i class="fa-sharp fa-solid fa-star"></i></h4>
</div>
<div class="actual-comment-div">
<p class="actual-comment">
${comment.body}
</p>
</div>
<form data-commentId="${comment._id}" class="delete-div" id="delete-form" method="POST" action="api/mangas/${mangaId}/comments/${comment._id}?_method=DELETE">
<button type="submit" class="comment-delete-btn"><i class="fa-solid fa-trash"></i></button>
</form>
`
    // add CSS class to give style to comment block//
    newComment.classList.add("comment-block")
    //append comment block to commentsContainer
    commentsContainer.prepend(newComment);
}

//function to add single comment to Page //
async function addComment(comment) {
    const authorId = comment.author._id;

    const currentUserObj = document.querySelector(".user-div")
    if (currentUserObj === null) {
        addCommentsForNotUsers(comment)
    } else {
        const currentUser = currentUserObj.innerText.trim();
        console.log(currentUser)
        const currentUserIdDiv = document.querySelector(".user_id-div")
        const currentUserId = currentUserIdDiv.innerText.trim();
        console.log(currentUserId)
        if (currentUserId === authorId) {
            addCommentsForUserAuthor(comment)

        } else {
            addCommentsForNotUsers(comment)
        }

    }
}



async function createComment() {
    // select value of textarea and range input
    const bodyInput = commentBodyInput.value;
    const ratingInput = commentRangeInput.value;
    //post the newComment on the database 
    const response = await axios.post(`/api/mangas/${mangaId}/comments`, {
        body: bodyInput,
        rating: ratingInput,
    });
    const newComment = response.data;
    //add new comment to the page
    addComment(newComment);
    //update the new User Score after a comment is created
    updateUserScore();
    //set values of textarea and rangeinput back to default
    commentBodyInput.value = ""
    commentRangeInput.value = 5;
    rangeOutput.innerText = 5;

}


const artBar = document.querySelector(".art-bar")
const characterBar = document.querySelector(".character-bar")
const storyBar = document.querySelector(".story-bar")

async function setBars() {
    const response = await axios.get(`/api/mangas/${mangaId}`)
    const manga = response.data

    const artBar = document.querySelector(".art-bar")
    const characterBar = document.querySelector(".character-bar")
    const storyBar = document.querySelector(".story-bar")

    const artScore = manga.scores.artScore;
    const characterScore = manga.scores.characterScore;
    const storyScore = manga.scores.storyScore;


    const artScoreWidth = Math.floor(artScore * 10)
    const characterScoreWidth = Math.floor(characterScore * 10)
    const storyScoreWidth = Math.floor(storyScore * 10)

    artBar.setAttribute("style", `width:${artScoreWidth}%`);
    characterBar.setAttribute("style", `width:${characterScoreWidth}%`);
    storyBar.setAttribute("style", `width:${storyScoreWidth}%`)
}
setBars()


const mangaTitle = document.querySelector(".manga-title")

const fontSizeChanger = function () {
    if (mangaTitle.innerText.length > 22) {
        mangaTitle.classList.add("smaller-title")
    }
}
fontSizeChanger();

