// CONSTANTS
const API_URL = "http://localhost:8000/api/v1";

const CAROUSEL_SIZE = 7;

const MOVIES_CATEGORIES_PARAMS = [
    {sort_by: '-imdb_score', page_size: CAROUSEL_SIZE + 1},
    {genre: 'Action', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE},
    {genre: 'Musical', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE},
    {genre: 'Fantasy', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE}]


// Getting Data from API functions
async function getMovies(searchParams) {
    const searchQuery = new URLSearchParams(searchParams).toString();
    return fetch(API_URL + `/titles?${searchQuery}`)
        .then(response => response.json())
        .then(value => value.results);
}

async function getMoviesCategoriesData(moviesCategoryParams) {
    let result = Array.from(await Promise.all(moviesCategoryParams.map((params) => getMovies(params))));
    const bestRatedMovieDetailed = result[0].splice(0, 1);
    return {
        "best-movie" : bestRatedMovieDetailed,
        "top-rated": result[0],
        "category-1": result[1],
        "category-2": result[2],
        "category-3": result[3]
    }
}

async function getMovieDetails(movieId) {
    return fetch(API_URL + "/titles/" + movieId).then(response => response.json());
}


// Onload events
window.onload = async function () {
    // Getting data
    const moviesCategoriesData = await getMoviesCategoriesData(MOVIES_CATEGORIES_PARAMS);

    // Update best-movie section
    updateSectionHero("best-movie", moviesCategoriesData["best-movie"][0].id);

    // Update top-rated section
    updateSectioncarousel("top-rated", moviesCategoriesData["top-rated"]);

    // Update category-1 section
    updateSectioncarousel("category-1", moviesCategoriesData["category-1"]);

    // Update category-2 section
    updateSectioncarousel("category-2", moviesCategoriesData["category-2"]);

    // Update category-3 section
    updateSectioncarousel("category-3", moviesCategoriesData["category-3"]);

    // Click events
    addModalOnClickBehavior(moviesCategoriesData);
}


// Udpate DOM functions
function updateSectioncarousel(sectionId, categoryData) {

    // Section Selection
    const section = document.querySelector(`#${sectionId}`);

    // Update thumbnails and modals
    let carouselThumbnails = section.querySelectorAll('.carousel__movie__thumbnail');

    for (let i = 0; i < CAROUSEL_SIZE; i++) {
        carouselThumbnails[i].src = categoryData[i].image_url;
    }


}

async function updateSectionHero(sectionId, movieID) {
    // Get Data
    let {title, description, image_url: imageUrl} = await getMovieDetails(movieID);

    // Section Selection
    const section = document.querySelector(`#${sectionId}`);

    // hero title
    let heroTitle = section.querySelector("#hero-title");
    heroTitle.textContent = title;

    // hero description
    let heroDescription = section.querySelector("#hero-description");
    heroDescription.textContent = description;

    // hero image
    let heroImage = section.querySelector(".hero__imgage");
    heroImage.src = imageUrl;


}

function updateMovieData(modalContentElement, movieDetailedData) {
    const {
        image_url: imageUrl,
        title,
        genres,
        year,
        rated,
        imdb_score: imdbScore,
        directors,
        actors,
        duration,
        countries,
        worldwide_gross_income: worldwideGrossIncome,
        long_description: longDescription
    } = movieDetailedData;

    // movie thumbnail
    let modalMovieThumbnailElement = modalContentElement.querySelectorAll("img");
    modalMovieThumbnailElement.forEach(element => element.src = imageUrl);

    // movie-title
    let movieTitleElement = modalContentElement.querySelector('#movie-title');
    movieTitleElement.textContent = `Titre : ${title}`;

    // movie-genres
    let movieGenresElement = modalContentElement.querySelector('#movie-genres');
    movieGenresElement.textContent = `Genre Complet : ${genres}`;

    // movie-year
    let movieYearElement = modalContentElement.querySelector('#movie-year');
    movieYearElement.textContent = `Date de sortie : ${year}`;

    // movie-rated
    let movieRatedElement = modalContentElement.querySelector('#movie-rated');
    movieRatedElement.textContent = `Rated : ${rated}`;

    // movie-imdb-score
    let movieImdbScoreElement = modalContentElement.querySelector('#movie-imdb-score');
    movieImdbScoreElement.textContent = `Score Imdb : ${imdbScore}`;

    // movie-directors
    let movieDirectorsElement = modalContentElement.querySelector('#movie-directors');
    movieDirectorsElement.textContent = `Réalisateur : ${directors}`;

    // movie-actors
    let movieActorsElement = modalContentElement.querySelector('#movie-actors');
    movieActorsElement.textContent = `Liste des acteurs : ${actors}`;

    // movie-duration
    let movieDurationElement = modalContentElement.querySelector('#movie-duration');
    movieDurationElement.textContent = `Durée :  ${duration} minutes`;

    // movie-country
    let movieCountryElement = modalContentElement.querySelector('#movie-country');
    movieCountryElement.textContent = `Pays d\'origine : ${countries}`;

    // movie-box-office-score
    let movieBoxOfficeScoreElement = modalContentElement.querySelector('#movie-box-office-score');
    movieBoxOfficeScoreElement.textContent = `Résultat au Box Office : ${worldwideGrossIncome} $`;

    // movie-summary
    let movieSummaryElement = modalContentElement.querySelector('#movie-summary');
    movieSummaryElement.textContent = `Résumé du film : ${longDescription}`;


}

function generateModalHTML(id) {
    return `<!-- Modal content -->
    <div class="modal__content">
        <div class="modal__content__left">
            <img id="modal-movie-thumbnail" class="modal__movie__thumbnail" src="assets/${id}-placeholder.png"/>
            <p id="movie-title" class="movie__title">Titre : ${id}_TITLE_placeholder</p>
            <p id="movie-genres" class="movie__genres">Genre Complet : ${id}_GENRES_placeholder</p>
            <p id= "movie-year" class="movie__year">Date de sortie : ${id}_YEAR_placeholder</p>
            <p id="movie-rated" class="movie__rated">Rated : ${id}_RATED_placeholder</p>
            <p id="movie-imdb-score" class="movie__imdb_score">Score Imdb : ${id}_IMDB_SCORE_placeholder</p>
        </div>
        <div class="modal__content__right">
            <p id="movie-directors" class="movie__directors">Réalisateur : ${id}_DIRECTORS_placeholder</p>
            <p id="movie-actors" class="movie__actors">Liste des acteurs : ${id}_ACTORS_placeholder</p>
            <p id="movie-duration" class="movie__duration">Durée : ${id}_DURATION_placeholder</p>
            <p id="movie-country" class="movie__country">Pays d\'origine : ${id}_COUNTRY_placeholder</p>
            <p id="movie-box-office-score" class="movie__box_office_score">Résultat au Box Office : ${id}_BOX_OFFICE_SCORE_placeholder</p>
            <p id="movie-summary" class="movie__summary">Résumé du film : ${id}_SUMMARY_placeholder</p>
        </div>
        <span class="close">&times;</span>
    </div>`;
}


// Click Events functions
function addModalOnClickBehavior(moviesDetailedData) {
    // When the user clicks on the modal__triggers, generate HTML, update data and open the modal
    const sections = document.querySelectorAll("section");
    for (let section of sections) {
        const modalTriggers = Array.from(section.querySelectorAll(".modal__trigger"));
        for (let modalTrigger of modalTriggers) {
            let modal = modalTrigger.parentNode.querySelector(".modal");
            modalTrigger.onclick = async function () {
                if (!modal.innerHTML) {
                    // Generate placeholder
                    modal.innerHTML = generateModalHTML(section.id);
                    // Update data
                    updateMovieData(modal, await getMovieDetails(moviesDetailedData[section.id][modalTriggers.indexOf(modalTrigger)].id));
                    // Close button
                    const spanElement = modal.querySelector(".close")
                    spanElement.onclick = function () {
                        modal.style.display = "none";
                    }
                }
                modal.style.display = "flex";
            }
        }
    }
}

// Closing Events for all modals
var modalElements = document.querySelectorAll(".modal");

window.onclick = function (event) {
    // When the user clicks anywhere outside of the modal, close it
    for (let i = 0; i < modalElements.length; i++) {
        if (event.target === modalElements[i]) {
            modalElements[i].style.display = "none";
        }
    }
}


window.addEventListener('keydown', function (event) {
    // When the user press EscapeKey, close it
    for (let i = 0; i < modalElements.length; i++) {
        if (event.code === 'Escape') {
            modalElements[i].style.display = 'none'
        }
    }
})

