const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader")
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplah API
const count = 30;
const apiKey = "5JoHGeiLioC65tYLNXuNLBXajl8L7kM5VHyMVX0v9fc";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready is", ready)
        console.log(imagesLoaded)
    }
}



// Helper func to set attributes on dom elements
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements fro links and photos, and add to DOM
function displayPhotos() {
    totalImages += photosArray.length
    console.log(totalImages)
    photosArray.forEach((photo) => {
        // Create <a> to lin to Unsplah
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.regular,
            target: "_blank"
        })
        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each is finished loading
        img.addEventListener("load", imageLoaded)

        // Put <img> in <a>, then put both inside imgContainer
        item.appendChild(img);
        imgContainer.appendChild(item)
    })
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (e) {
        console.log(e)
    }

}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();
