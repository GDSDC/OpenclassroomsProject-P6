const API_URL = "http://localhost:8000/api/v1";
const CAROUSEL_SIZE = 7;
const MOVIES_CATEGORIES_PARAMS = [
    {sort_by: '-imdb_score', page_size: CAROUSEL_SIZE + 1},
    {genre: 'Action', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE},
    {genre: 'Musical', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE},
    {genre: 'Thriller', sort_by: '-imdb_score', page_size: CAROUSEL_SIZE},
]

async function getMovieFiltered(filterInput) {

    let resultJsonFetch = fetch(API_URL + "/titles/?" + filterInput)
        .then(response => {
            return response.json();
        })
        .then((value) => {
            return value.results;
        });

    let resultJson = await resultJsonFetch;

    return resultJson;
}

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
    let result = Promise.all(
        Array.from(await dataNotDetailed, x => Promise.all(x.map(movie => getMovieDetails(movie.id))))
    );

    return result;
}


const moviesCategoriesData = Promise.all(
    MOVIES_CATEGORIES_PARAMS.map((params) => getMovies(params)))
    .then(value => value.map(category => category.map(movie => getMovieDetails(movie.id))));


async function getAllMoviesFilteredDetails(filterInput) {
    // Initialization
    let firstHalf = getMovieFiltered(filterInput);
    let secondHalf = getMovieFiltered(filterInput + '&page=2')

    // First Half of data
    let firstHalfResult = firstHalf.then((value => {
        let result = [];
        for (let movie of value) {
            result.push(getMovieDetails(movie.id));
        }
        return result;
    }));

    // Second Half of data
    let secondHalfResult = secondHalf.then((value => {
        let result = [];
        for (let movie of value) {
            result.push(getMovieDetails(movie.id));
        }
        return result;
    }));


    return [firstHalfResult, secondHalfResult];
}


async function getMovieDetails(movieId) {
    let resultJsonFetch = fetch(API_URL + "/titles/" + movieId)
        .then(response => {
            return response.json();
        });

    let resultJson = await resultJsonFetch;

    return resultJson;
}

const moviesAction = getAllMoviesFilteredDetails('imdb_score_min=8.8&genre=Action');
const moviesMusical = getAllMoviesFilteredDetails('imdb_score_min=8.8&genre=Musical');
const moviesThriller = getAllMoviesFilteredDetails('imdb_score_min=8.8&genre=Thriller');
const bestRatedMovies = getAllMoviesFilteredDetails('imdb_score_min=9');
const bestMoviePromise = bestRatedMovies.then((value) => {
    return value[0];
}).then((value) => {
    return value[0];
});


window.onload = function () {

    // Update best-movie section
    updateSectionHero('best-movie', bestMoviePromise);

    // Update top-rated section
    updateSectioncarousel('top-rated', bestRatedMovies, start = 1);

    // Update category-1 section
    updateSectioncarousel('category-1', moviesAction);

    // Update category-2 section
    updateSectioncarousel('category-2', moviesMusical);

    // Update category-3 section
    updateSectioncarousel('category-3', moviesThriller);


}


function updateSectioncarousel(sectionId, moviesPromises, start = 0) {
    // Section Selection
    let section = document.querySelector(`#${sectionId}`);

    // Update thumbnails and modals
    let carouselElements = section.querySelectorAll('.carousel__movie');

    for (let i = start; i < 5; i++) {
        let moviePromiseResponse = moviesPromises.then((value) => {
            return value[0];
        }).then((value) => {
            return value[i];
        });
        updateMovieData(carouselElements[i - start], moviePromiseResponse);
    }

    for (let i = 0; i < 2 + start; i++) {
        let moviePromiseResponse = moviesPromises.then((value) => {
            return value[1];
        }).then((value) => {
            return value[i];
        });
        updateMovieData(carouselElements[i + 5 - start], moviePromiseResponse);
    }


}

function updateSectionHero(sectionId, moviePromiseResponse) {
    // Section Selection
    let section = document.querySelector(`#${sectionId}`);

    // Update Hero Info
    updateHeroInfo(section, moviePromiseResponse);

    // Update Modal
    updateMovieData(section, moviePromiseResponse);

}

function updateHeroInfo(modalContentElement, moviePromiseResponse) {

    moviePromiseResponse.then((value) => {
        // hero title
        let heroTitle = modalContentElement.querySelector("#hero-title");
        heroTitle.textContent = value.title;

        // hero description
        let heroDescription = modalContentElement.querySelector("#hero-description");
        heroDescription.textContent = value.description;
    });
}

function updateMovieData(modalContentElement, moviePromiseResponse) {

    moviePromiseResponse.then((value) => {
        // movie thumbnail
        let modalMovieThumbnailElement = modalContentElement.querySelectorAll("img");
        modalMovieThumbnailElement.forEach(element => element.src = value.image_url);

        // movie-title
        let movieTitleElement = modalContentElement.querySelector('#movie-title');
        movieTitleElement.textContent = 'Titre : ' + value.title;

        // movie-genres
        let movieGenresElement = modalContentElement.querySelector('#movie-genres');
        movieGenresElement.textContent = 'Genre Complet : ' + value.genres;

        // movie-year
        let movieYearElement = modalContentElement.querySelector('#movie-year');
        movieYearElement.textContent = 'Date de sortie : ' + value.year;

        // movie-rated
        let movieRatedElement = modalContentElement.querySelector('#movie-rated');
        movieRatedElement.textContent = 'Rated : ' + value.rated;

        // movie-imdb-score
        let movieImdbScoreElement = modalContentElement.querySelector('#movie-imdb-score');
        movieImdbScoreElement.textContent = 'Score Imdb : ' + value.imdb_score;

        // movie-directors
        let movieDirectorsElement = modalContentElement.querySelector('#movie-directors');
        movieDirectorsElement.textContent = 'Réalisateur : ' + value.directors;

        // movie-actors
        let movieActorsElement = modalContentElement.querySelector('#movie-actors');
        movieActorsElement.textContent = 'Liste des acteurs : ' + value.actors;

        // movie-duration
        let movieDurationElement = modalContentElement.querySelector('#movie-duration');
        movieDurationElement.textContent = 'Durée :  ' + value.duration + ' minutes';

        // movie-country
        let movieCountryElement = modalContentElement.querySelector('#movie-country');
        movieCountryElement.textContent = 'Pays d\'origine : ' + value.countries;

        // movie-box-office-score
        let movieBoxOfficeScoreElement = modalContentElement.querySelector('#movie-box-office-score');
        movieBoxOfficeScoreElement.textContent = 'Résultat au Box Office : ' + value.worldwide_gross_income + ' $';

        // movie-summary
        let movieSummaryElement = modalContentElement.querySelector('#movie-summary');
        movieSummaryElement.textContent = 'Résumé du film : ' + value.long_description;
    });

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

// Inserting all modals in HTML
var sections = document.querySelectorAll("section");
for (let section of sections) {
    let modals = section.querySelectorAll(".modal");
    for (let modal of modals) {
        modal.innerHTML = generateModalHTML(section.id);
    }
}


// Get the button that opens the modal
var modalTriggerElements = document.querySelectorAll(".modal__trigger");

// Get the <span> element that closes the modal
var spanElements = document.querySelectorAll(".close");

// When the user clicks on the modal__triggers, open the modal
for (let i = 0; i < modalTriggerElements.length; i++) {
    modalTriggerElements[i].onclick = function () {
        modalElements[i].style.display = "block";
    }
}
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

