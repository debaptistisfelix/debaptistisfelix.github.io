


const icon = document.querySelector(".icon");
const navlinks = document.querySelector(".nav-links");
const searchInput = document.querySelector("#search-box")
const searchDiv = document.querySelector(".search-div")
const resultsContainer = document.querySelector(".search-results");
const searchIcon = document.querySelector("#search-icon")

function mobileMenu() {
    navlinks.classList.toggle("alive");
}

icon.addEventListener("click", mobileMenu);











const searchMangas = async function (e) {
    //empty results so you don't get one for every search if results container stays open //
    resultsContainer.classList.remove("is-shown")
    resultsContainer.innerHTML = "";

    resultsContainer.classList.add("is-shown")
    searchIcon.style.color = "#fb5706"

    //if searchInput is empty don't show the resultsContainer //
    if (searchInput.value === "") {
        resultsContainer.classList.remove("is-shown")
        resultsContainer.innerHTML = "";
        searchIcon.style.color = "white"
    }

    //fetch all mangas//
    const response = await axios.get("/api/mangas")
    const mangas = response.data

    //lowercase anything yu write in the search Input//
    const writtenInput = e.target.value.toLowerCase();
    //filter mangas based on what you write in input
    const foundMangas = await mangas.filter(manga => manga.title.toLowerCase().includes(writtenInput));

    if (foundMangas.length === 0 && e.target.value !== "") {
        console.log(`no results for ${writtenInput}`)
        // create a div for every manga matching query string //
        const div = document.createElement("div");

        // insert this html into the result-block //
        div.innerHTML = `
  <h2 class="no-results-h2"> 0 results found for (${writtenInput})
  `

        // add CSS and append to result-block-container //
        div.classList.add("no-results-div");
        resultsContainer.appendChild(div)
    } else if (foundMangas.length !== 0 && writtenInput !== "") {
        for (let manga of foundMangas) {
            console.log(`${manga.title} contains ${writtenInput}`)
            // create a div for every manga matching query string //
            const div = document.createElement("div");

            // insert this html into the result-block //
            div.innerHTML = `
     <img class="search-manga-vol-img" src="${manga.mangaVolumes.smallVol.url}"></img>
     <div class="search-text-block">
     <a href="/index/${manga._id}" class="search-manga-title">${manga.title}</a>
     <h3 class="search-score"> TOTAL SCORE: ${manga.scores.totalScore} <i class="fa-solid fa-star"></i></h3>
     <div class="search-random-categ-tags">
     <div class="search-categ-div">
         <img src="${manga.categoryTags.categTag1}" alt="">
     </div>
     <div class="search-categ-div">
         <img src="${manga.categoryTags.categTag2}" alt="">
     </div>
     <div class="search-categ-div">
         <img src="${manga.categoryTags.categTag3}" alt="">
     </div>
 </div>
     </div>
     `

            // add CSS and append to result-block-container //
            div.classList.add("search-result-block");
            resultsContainer.appendChild(div)
        }
    }

}


// debounce func to delay the get request and make it after you stop writing for 1 sec //
const debounce = (func, delay) => {
    // define timeOutId //
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};




searchInput.addEventListener("input", debounce(searchMangas, 500))


















// function fetchData to get the mangas for the searchBar //

/* const fetchData = async (searchTerm) => {
    // get mangas based on searchTerm from searchInput //
    const data = await axios.get("/api/mangas/search", {
        params: {
            title: searchTerm
        }
    })
    // return the result from the get request //
    return data.data;
}








const onInput = async (event) => {
    // get data from search Input using input.value //
    const mangas = await fetchData(event.target.value);
    console.log(mangas)


    //select the results container and give it class active //

    resultsContainer.classList.add("is-active")

    //if searchInput is empty or there are no results we remove class is-active and empty the container html //
    if (searchInput.value === "" || mangas.length === 0) {
        resultsContainer.classList.remove("is-active")
        resultsContainer.innerHTML = "";
    }


    // loop found mangas //
    for (let manga of mangas) {
        // create a div for every manga matching query string //
        const div = document.createElement("div");

        // insert this html into the result-block //
        div.innerHTML = `
        <img class="search-manga-vol-img" src="${manga.mangaVolumes.smallVol.url}"></img>
        <div class="search-text-block">
        <a href="/index/${manga._id}" class="search-manga-title">${manga.title}</a>
        <h3 class="search-score"> TOTAL SCORE: ${manga.scores.totalScore} <i class="fa-solid fa-star"></i></h3>
        <div class="search-random-categ-tags">
        <div class="search-categ-div">
            <img src="${manga.categoryTags.categTag1}" alt="">
        </div>
        <div class="search-categ-div">
            <img src="${manga.categoryTags.categTag2}" alt="">
        </div>
        <div class="search-categ-div">
            <img src="${manga.categoryTags.categTag3}" alt="">
        </div>
    </div>
        </div>
        `

        // add CSS and append to result-block-container //
        div.classList.add("search-result-block");
        resultsContainer.appendChild(div)
    }
} */

/* searchInput.addEventListener("input", debounce(onInput, 500)) */

// make an eventListener that closes the resultsContainer if we click anywhere else //
document.addEventListener("click", event => {
    //if you press anywhere not inside the searchDiv//
    if (!searchDiv.contains(event.target)) {
        //remove class is-active //
        resultsContainer.classList.remove("is-active")
        // empty its HTML//
        resultsContainer.innerHTML = ""
        // empty the searchInput value //
        searchInput.value = "";
    }
})












