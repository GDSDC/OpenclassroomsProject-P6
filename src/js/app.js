const API_URL = "http://localhost:8000/api/v1";
const CAROUSEL_SIZE = 7;
const MOVIES_CATEGORIES_PARAMS = [
    {sort_by: '-imdb_score', page_size: CAROUSEL_SIZE + 1},
    {genre: 'Action', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE},
    {genre: 'Musical', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE},
    {genre: 'Thriller', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE}]

async function getMovies(searchParams) {
    const searchQuery = new URLSearchParams(searchParams).toString();
    return fetch(API_URL + `/titles?${searchQuery}`)
        .then(response => response.json())
        .then(value => value.results);
}

async function getMovieDetails(movieId) {
    return fetch(API_URL + "/titles/" + movieId).then(response => response.json());
}


async function getMoviesCategoriesData(moviesCategoryParams) {
    let dataNotDetailed = Promise.all(moviesCategoryParams.map((params) => getMovies(params)));
    let result = await Promise.all(
        Array.from(await dataNotDetailed, x => Promise.all(x.map(movie => getMovieDetails(movie.id))))
    );
    let resultDict = {
        "top-rated": result[0],
        "category-1": result[1],
        "category-2": result[2],
        "category-3": result[3]
    }

    return resultDict;
}


window.onload = async function () {
    // Getting data
    const moviesCategoriesData = await getMoviesCategoriesData(MOVIES_CATEGORIES_PARAMS);

    clickModal(moviesCategoriesData);

    // // Update best-movie section
    // updateSectionHero('best-movie', moviesCategoriesData["top-rated"][0]);
    //
    // // Update top-rated section
    // updateSectioncarousel('top-rated', moviesCategoriesData["top-rated"], start = 1);
    //
    // // Update category-1 section
    // updateSectioncarousel('category-1', moviesCategoriesData["category-1"]);
    //
    // // Update category-2 section
    // updateSectioncarousel('category-2', moviesCategoriesData["category-2"]);
    //
    // // Update category-3 section
    // updateSectioncarousel('category-3', moviesCategoriesData["category-1"]);


}


async function updateSectioncarousel(sectionId, categoryDetailedData, start = 0) {

    // Section Selection
    let section = document.querySelector(`#${sectionId}`);

    // Update thumbnails and modals
    let carouselElements = section.querySelectorAll('.carousel__movie');

    for (let i = start; i < CAROUSEL_SIZE + start; i++) {
        updateMovieData(carouselElements[i - start], categoryDetailedData[i]);
    }


}

function updateSectionHero(sectionId, movieDetailedData) {
    // Section Selection
    let section = document.querySelector(`#${sectionId}`);

    // Update Hero Info
    updateHeroInfo(section, movieDetailedData);

    // Update Modal
    updateMovieData(section, movieDetailedData);

}

function updateHeroInfo(modalContentElement, movieDetailedData) {

    // hero title
    let heroTitle = modalContentElement.querySelector("#hero-title");
    heroTitle.textContent = movieDetailedData.title;

    // hero description
    let heroDescription = modalContentElement.querySelector("#hero-description");
    heroDescription.textContent = movieDetailedData.description;

}

function updateMovieData(modalContentElement, movieDetailedData) {

    // movie thumbnail
    let modalMovieThumbnailElement = modalContentElement.querySelectorAll("img");
    modalMovieThumbnailElement.forEach(element => element.src = movieDetailedData.image_url);

    // movie-title
    let movieTitleElement = modalContentElement.querySelector('#movie-title');
    movieTitleElement.textContent = 'Titre : ' + movieDetailedData.title;

    // movie-genres
    let movieGenresElement = modalContentElement.querySelector('#movie-genres');
    movieGenresElement.textContent = 'Genre Complet : ' + movieDetailedData.genres;

    // movie-year
    let movieYearElement = modalContentElement.querySelector('#movie-year');
    movieYearElement.textContent = 'Date de sortie : ' + movieDetailedData.year;

    // movie-rated
    let movieRatedElement = modalContentElement.querySelector('#movie-rated');
    movieRatedElement.textContent = 'Rated : ' + movieDetailedData.rated;

    // movie-imdb-score
    let movieImdbScoreElement = modalContentElement.querySelector('#movie-imdb-score');
    movieImdbScoreElement.textContent = 'Score Imdb : ' + movieDetailedData.imdb_score;

    // movie-directors
    let movieDirectorsElement = modalContentElement.querySelector('#movie-directors');
    movieDirectorsElement.textContent = 'Réalisateur : ' + movieDetailedData.directors;

    // movie-actors
    let movieActorsElement = modalContentElement.querySelector('#movie-actors');
    movieActorsElement.textContent = 'Liste des acteurs : ' + movieDetailedData.actors;

    // movie-duration
    let movieDurationElement = modalContentElement.querySelector('#movie-duration');
    movieDurationElement.textContent = 'Durée :  ' + movieDetailedData.duration + ' minutes';

    // movie-country
    let movieCountryElement = modalContentElement.querySelector('#movie-country');
    movieCountryElement.textContent = 'Pays d\'origine : ' + movieDetailedData.countries;

    // movie-box-office-score
    let movieBoxOfficeScoreElement = modalContentElement.querySelector('#movie-box-office-score');
    movieBoxOfficeScoreElement.textContent = 'Résultat au Box Office : ' + movieDetailedData.worldwide_gross_income + ' $';

    // movie-summary
    let movieSummaryElement = modalContentElement.querySelector('#movie-summary');
    movieSummaryElement.textContent = 'Résumé du film : ' + movieDetailedData.long_description;


}

// Get the modal
var modalElements = document.querySelectorAll(".modal");

// Generate HTML modal template
function generateModalHTML(id) {
    let modalHTMLOutput = `<!-- Modal content -->
    <div class="modal-content">
        <div>
            <img id="modal-movie-thumbnail" class="modal__movie__thumbnail" src="assets/${id}-placeholder.png"/>
            <p id="movie-title" class="movie__title">Titre : ${id}_TITLE_placeholder</p>
            <p id="movie-genres" class="movie__genres">Genre Complet : ${id}_GENRES_placeholder</p>
            <p id= "movie-year" class="movie__year">Date de sortie : ${id}_YEAR_placeholder</p>
            <p id="movie-rated" class="movie__rated">Rated : ${id}_RATED_placeholder</p>
            <p id="movie-imdb-score" class="movie__imdb_score">Score Imdb : ${id}_IMDB_SCORE_placeholder</p>
        </div>
        <div>
            <p id="movie-directors" class="movie__directors">Réalisateur : ${id}_DIRECTORS_placeholder</p>
            <p id="movie-actors" class="movie__actors">Liste des acteurs : ${id}_ACTORS_placeholder</p>
            <p id="movie-duration" class="movie__duration">Durée : ${id}_DURATION_placeholder</p>
            <p id="movie-country" class="movie__country">Pays d\'origine : ${id}_COUNTRY_placeholder</p>
            <p id="movie-box-office-score" class="movie__box_office_score">Résultat au Box Office : ${id}_BOX_OFFICE_SCORE_placeholder</p>
            <p id="movie-summary" class="movie__summary">Résumé du film : ${id}_SUMMARY_placeholder</p>
        </div>
        <span class="close">&times;</span>
    </div>`
    return modalHTMLOutput
}

// // Inserting all modals in HTML
// var sections = document.querySelectorAll("section");
// for (let section of sections) {
//     let modals = section.querySelectorAll(".modal");
//     for (let modal of modals) {
//         modal.innerHTML = generateModalHTML(section.id);
//     }
// }


// Get the button that opens the modal
var modalTriggerElements = document.querySelectorAll(".modal__trigger");

// Get the <span> element that closes the modal
var spanElements = document.querySelectorAll(".close");

// When the user clicks on the modal__triggers, open the modal
function clickModal(moviesDetailedData) {

    var sections = document.querySelectorAll("section");
    for (let section of sections) {
        let carousels = Array.prototype.slice.call(section.querySelectorAll(".carousel__movie"));
        for (let carousel of carousels) {
            let modalTrigger = carousel.querySelector(".modal__trigger");
            let modal = carousel.querySelector(".modal");
            modalTrigger.onclick = function () {
                modal.innerHTML = generateModalHTML(section.id);
                // TODO : handle case of top rated that begin at index 1 not 0
                updateMovieData(modal, moviesDetailedData[section.id][carousels.indexOf(carousel)]);
                modal.style.display = "block";
            }
        }
    }
}

// // When the user clicks on the modal__triggers, open the modal
// for (let i = 0; i < modalTriggerElements.length; i++) {
//     modalTriggerElements[i].onclick = function () {
//         modalElements[i].style.display = "block";
//     }
// }

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spanElements.length; i++) {
    spanElements[i].onclick = function () {
        modalElements[i].style.display = "none";
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    for (let i = 0; i < modalElements.length; i++) {
        if (event.target == modalElements[i]) {
            modalElements[i].style.display = "none";
        }
    }
}
// When the user press EscapeKey, close it
window.addEventListener('keydown', function (event) {
    for (let i = 0; i < modalElements.length; i++) {
        if (event.key === 'Escape') {
            modalElements[i].style.display = 'none'
        }
    }
})

