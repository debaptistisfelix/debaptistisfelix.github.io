const tattooerIdSpan = document.querySelector(".tattooer-id-span")
const tattooerId = tattooerIdSpan.innerText.trim();
const commentsContainer = document.querySelector(".comments-container");
const commentBodyInput = document.querySelector("#comment-textarea");
const commentRangeInput = document.querySelector("#range-input")
const commentDeletBtn = document.querySelector(".comment-delete-btn")
const commentForm = document.querySelector(".comments-form")
const deleteForm = document.querySelector("#delete-form");
const rangeOutput = document.querySelector("#rangevalue");
const commentsCount = document.querySelector(".comments-count")
const currentUserObj = document.querySelector(".user-div");
const tattooBlocks = document.querySelectorAll(".img-block-container");




// SOCIALS ANCHOR TAGS LOGIC//

//Select the anchor tag and its href //
const tiktokLink = document.querySelector(".tiktok-link")
const tiktokHref = tiktokLink.getAttribute("href");

const instaLink = document.querySelector(".insta-link")
const instaHref = instaLink.getAttribute("href");

const fbLink = document.querySelector(".fb-link")
const fbHref = fbLink.getAttribute("href");

async function displaySocials(href, link) {
    //if href is X (no account for that media)
    if (href === "X") {
        //add class that lowers opacity of anchor tag
        link.classList.add("off-social")
    } else if (href.length > 1) {
        //if it's not X, bu t a link turn opacity on 
        link.classList.add("on-social")
    }
}


displaySocials(fbHref, fbLink);
displaySocials(instaHref, instaLink);
displaySocials(tiktokHref, tiktokLink);



// this function will happen as soon as the HTML of the page is loaded//
document.addEventListener("DOMContentLoaded", function () {

    fetchComments();


    //post User Scores 
    updateUserScore();


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

    setUpPaths();
    displayLikes();
    likeTattoo()


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
        await axios.delete(`/api/tattooers/${tattooerId}/comments/${commentId}`);
        //remove commentBlock from commentsContainer
        commentBlock.remove();
        //update Users Score
        updateUserScore();
    })

}





//function to fetch all the comments related to the mangaReview//
async function fetchComments() {
    try {
        const response = await axios.get(`/api/tattooers/${tattooerId}/comments`);
        const comments = response.data
        //add comments to page //
        addComments(comments);
    }
    catch (e) {
        console.log(e)
        console.log("No comments yet for this tattooer")
    }
}

async function updateUserScore() {
    const response = await axios.get(`/api/tattooers/${tattooerId}/comments`);
    const comments = response.data
    const usersRating = document.querySelector(".tattooer-exp")
    let sum = 0;
    console.log(comments.length)
    if (!comments.length) {
        usersRating.innerText = "Vote Below!"
        commentsCount.innerText = 0;
    } else {
        for (let comment of comments) {
            sum += comment.rating;
        }
        let avg = (sum / comments.length).toFixed(1);
        usersRating.innerHTML = ` Rated: ${avg} <i class="fa-sharp fa-solid fa-star"></i>`
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


function addCommentForNonUser(comment) {
    const newComment = document.createElement("div");
    newComment.innerHTML = `
    <div class="user-time-div">
    <h3 class="comment-user">
   ${comment.author.username}
   </h3>
   <h4 class="time-stamp">rated this Artist ${comment.rating} <i class="fa-sharp fa-solid fa-star"></i></h4>
   </div>
   <div class="actual-comment-div">
   <p class="actual-comment">
   ${comment.body}
   </p>
   </div>
   <form data-commentId="${comment._id}" class="delete-div" id="delete-form">
   </form>`
    // add CSS class to give style to comment block//
    newComment.classList.add("comment-block")
    //append comment block to commentsContainer
    commentsContainer.prepend(newComment);
}

function addCommentsForUserAuthor(comment) {
    const newComment = document.createElement("div");
    newComment.innerHTML =
        //we make the delete Comment btn available for the author of the comment //
        `
    <div class="user-time-div">
    <h3 class="comment-user">
   ${comment.author.username}
   </h3>
   <h4 class="time-stamp">rated this Artist ${comment.rating} <i class="fa-sharp fa-solid fa-star"></i></h4>
   </div>
   <div class="actual-comment-div">
   <p class="actual-comment">
   ${comment.body}
   </p>
   </div>
   <form data-commentId="${comment._id}" class="delete-div" id="delete-form" method="POST" action="api/tattooers/${tattooerId}/comments/${comment._id}?_method=DELETE">
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
    if (currentUserObj === null) {
        addCommentForNonUser(comment)
    } else {
        //IF USER IS LOGGED IN //
        const currentUser = currentUserObj.innerText.trim();
        const currentUserIdDiv = document.querySelector(".user_id-div")
        const currentUserId = currentUserIdDiv.innerText.trim();
        if (currentUserId === authorId) {
            addCommentsForUserAuthor(comment)
        } else {
            addCommentForNonUser(comment)
        }

    }
}





async function createComment() {
    // select value of textarea and range input
    const bodyInput = commentBodyInput.value;
    const ratingInput = commentRangeInput.value;
    //post the newComment on the database 
    const response = await axios.post(`/api/tattooers/${tattooerId}/comments`, {
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

























async function setUpPaths(block) {

    // Loop over all the tattoo blocks to access every single one //
    for (let block of tattooBlocks) {

        const scoreBtnDiv = block.querySelector(".score-btn")
        const heartScoreDiv = block.querySelector(".heart-nr-div")

        //if there is no user logged in: //
        if (currentUserObj === null) {
            console.log("User not logged in!!!!")
            //we create an <a> to redirect to /login //
            const loginLink = document.createElement("a");
            scoreBtnDiv.prepend(loginLink)
            loginLink.classList.add("vote-btn")
            loginLink.innerText = "VOTE"
            loginLink.setAttribute("href", "/login")
            heartScoreDiv.classList.add("white-heart")
            //if there is a User logged in: //
        } else {
            //first we get the User Id//
            console.log("User logged in");
            const currentUser = currentUserObj.innerText.trim();
            const currentUserIdDiv = document.querySelector(".user_id-div")
            const currentUserId = currentUserIdDiv.innerText.trim();
            //then we create a <button> to like/unlike the tattoo//
            const voteBtn = document.createElement("button");
            scoreBtnDiv.prepend(voteBtn)
            voteBtn.classList.add("vote-btn")
            voteBtn.innerText = "VOTE"
            voteBtn.setAttribute("type", "submit")
            // we need the tattoo._id to check if the likes array does include it!//
            const tattooIdSpan = block.querySelector(".tattoo-id");
            const tattooId = tattooIdSpan.innerText.trim();
            // request the tattoo to check the Likes //
            const response = await axios.get(`/api/tattooers/${tattooerId}/tattoos/${tattooId}`)
            const tattoo = response.data;




            //if UserId is included in tattoo.likes //
            if (tattoo.likes.includes(currentUserId)) {
                const likeForm = block.querySelector(".img-block")
                //form.action is to UNLIKE the tattoo //
                likeForm.setAttribute("action", `/api/tattooers/${tattooerId}/tattoos/${tattooId}/unlike`)
                heartScoreDiv.classList.add("og-heart")
                heartScoreDiv.classList.remove("white-heart")

                //if UserId is NOT included in tattoo.likes //
            } else if (!tattoo.likes.includes(currentUserId)) {
                const likeForm = block.querySelector(".img-block")
                //form.action is to LIKE the tattoo //
                likeForm.setAttribute("action", `/api/tattooers/${tattooerId}/tattoos/${tattooId}/like`)
                heartScoreDiv.classList.remove("og-heart")
                heartScoreDiv.classList.add("white-heart")
            }

        }
    }
}




async function displayLikes() {
    //loop over each tattooBlock //
    for (let block of tattooBlocks) {
        //display Likes for each tattooBlock //
        displayLike(block);

    }
}



async function displayLike(block) {
    //get tattooId of single tattooBlock//
    const tattooIdSpan = block.querySelector(".tattoo-id");
    const tattooId = tattooIdSpan.innerText.trim();
    //get request to get the updated tattoo //
    const response = await axios.get(`/api/tattooers/${tattooerId}/tattoos/${tattooId}`)
    const tattoo = response.data;

    //select the element that displays the number of the likes//
    const likeScore = block.querySelector(".tattoo-likes");
    //change innerHTML of it to heartIcon + nr of userIds inside tattoo.likes//
    likeScore.innerText = `${tattoo.likes.length}`
}

async function likeTattoo() {
    //loop over the tattooBlock//
    for (let block of tattooBlocks) {
        //get tattooId from the tattooBlock//
        const tattooIdSpan = block.querySelector(".tattoo-id");
        const tattooId = tattooIdSpan.innerText.trim();
        //select the form to submit the like/unlike request //
        const likeForm = block.querySelector(".img-block")
        //get the UserId //
        const currentUser = currentUserObj.innerText.trim();
        const currentUserIdDiv = document.querySelector(".user_id-div")
        const currentUserId = currentUserIdDiv.innerText.trim();
        //add an eventListener on the like/unlike Form//
        likeForm.addEventListener("submit", async function (e) {
            // prevent refreshing of the page after submit//
            e.preventDefault();
            //request the Tattoo every time you press, to make sure it's updated .....//
            const response = await axios.get(`/api/tattooers/${tattooerId}/tattoos/${tattooId}`)
            const tattoo = response.data;

            const heartScoreDiv = block.querySelector(".heart-nr-div")
            // .... so now you can check, every time you press the voteBtn, if the tattoo.likes includes the userId //

            if (tattoo.likes.includes(currentUserId)) {
                console.log("you unliked it !!! :(")
                // POST request to submit th Unlike//
                await axios.post(`/api/tattooers/${tattooerId}/tattoos/${tattooId}/unlike`)
                // displayLike func to show that we removed the userId from tattoo.likes //
                await displayLike(block)
                // change color of heart when you Unlike a tattooBlock
                heartScoreDiv.classList.remove("og-heart")
                heartScoreDiv.classList.add("white-heart")


            } else if (!tattoo.likes.includes(currentUserId)) {
                console.log("you liked it !!! :))))")
                // POST request to submit th like//
                await axios.post(`/api/tattooers/${tattooerId}/tattoos/${tattooId}/like`)
                // displayLike func to show that we inserted the userId from tattoo.likes //
                await displayLike(block)
                // change color of heart when you like a tattooBlock
                heartScoreDiv.classList.add("og-heart")
                heartScoreDiv.classList.remove("white-heart")
            }
        })
    }
}







