const moviesIds = ["best_movie", "top_rated_movie_1", "top_rated_movie_2", "top_rated_movie_3", "top_rated_movie_4", "top_rated_movie_5", "top_rated_movie_6", "top_rated_movie_7", "category_1_movie_1", "category_1_movie_2", "category_1_movie_3", "category_1_movie_4", "category_1_movie_5", "category_1_movie_6", "category_1_movie_7", "category_2_movie_1", "category_2_movie_2", "category_2_movie_3", "category_2_movie_4", "category_2_movie_5", "category_2_movie_6", "category_2_movie_7", "category_3_movie_1", "category_3_movie_2", "category_3_movie_3", "category_3_movie_4", "category_3_movie_5", "category_3_movie_6", "category_3_movie_7"]

function getMoviesImagesJson() {
    return fetch("src/tests/img/JSON/movies_images.json")
        .then(response => {
            return response.json();
        })
        .then(data => console.log(data));
}

async function getMoviesFilteredTEST(filter_input) {

    let promise = fetch("http://localhost:8000/api/v1/titles/?" + filter_input)
        .then(response => {
            return response.json();
        })
    let jsonResult = await promise;
    return jsonResult;
}

function getMovieImage(id) {
    let movieImg = document.createElement("img");
    movieImg.src = "src/tests/img/PNG/" + id + ".png";
    movieImg.className = "thumbnail"
    return movieImg;
}

// var genres = [];

function getMovieGenres() {
// Initiate Request
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/v1/genres/");
    xhr.send();

// Initiate variables
    let genres = [];
    let next = 'ok';

// Request Onload
    xhr.onload = function () {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            // Fill in genres variable
            for (let genre in data.results) {
                genres.push(data.results[genre]);
            }
            // Check if next page exist
            next = data.next;
            if (next != null) {
                xhr.open("GET", next);
                xhr.send();
            }
        } else if (xhr.status === 404) {
            console.log("No records found")
        }
    }
    return genres;
}

genres = getMovieGenres();

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

delay(100).then(() => console.log(genres));


function getMoviesFiltered(filter_input) {
// Initiate Request
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/v1/titles/?" + filter_input);
    xhr.send();

// Initiate variables
    let moviesFiltered = [];
    let next = 'ok';

// Request Onload
    xhr.onload = function () {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            // Fill in genres variable
            for (let movie in data.results) {
                moviesFiltered.push(data.results[movie]);
            }
            // Check if next page exist
            next = data.next;
            if (next != null) {
                xhr.open("GET", next);
                xhr.send();
            }
        } else if (xhr.status === 404) {
            console.log("No records found")
        }
    }
    return moviesFiltered;
}

async function getMovieFilteredPromise(filter_input) {

    let resultJson = await fetch("http://localhost:8000/api/v1/titles/?" + filter_input)
        .then(response => {
            return response.json();
        })
        .then((value) => {
            return value.results;
        });

    return resultJson;
}

async function getAllMoviesFilteredDetailsPromise(filter_input) {
    // Initialization
    let firstHalf = getMovieFilteredPromise(filter_input);
    let secondHalf = getMovieFilteredPromise(filter_input + '&page=2')

    // First Half of data
    let firstHalfResult = firstHalf.then((value => {
        let result = [];
        for (let movie of value) {
            result.push(getMovieDetailsPromise(movie.id));
        }
        return result;
    }));

    // Second Half of data
    let secondHalfResult = secondHalf.then((value => {
        let result = [];
        for (let movie of value) {
            result.push(getMovieDetailsPromise(movie.id));
        }
        return result;
    }));


    return [firstHalfResult, secondHalfResult];
}

async function getMovieDetailsPromise(movieId) {
    let resultJson = await fetch("http://localhost:8000/api/v1/titles/" + movieId)
        .then(response => {
            return response.json();
        });

    return resultJson;
}

function getMovieDetails(moviePromiseResponse) {
    moviePromiseResponse.then((value) => {
        console.log(value.id);
    });
}

const moviesAction = getAllMoviesFilteredDetailsPromise('imdb_score_min=8.8&genre=Action');
const moviesMusical = getAllMoviesFilteredDetailsPromise('imdb_score_min=8.8&genre=Musical');
const moviesTrhiller = getAllMoviesFilteredDetailsPromise('imdb_score_min=8.8&genre=Thriller');
const bestRatedMovies = getAllMoviesFilteredDetailsPromise('imdb_score_min=9');


window.onload = function () {

    // Update top_rated_movies_section section
    update_section('top_rated_movies_section', bestRatedMovies)

    // Update category_1_section section
    update_section('category_1_section', moviesAction)

    // Update category_2_section section
    update_section('category_2_section', moviesMusical)

    // Update category_3_section section
    update_section('category_3_section', moviesTrhiller)


}

function update_section(sectionId, moviesPromises) {
    // Section Selection
    let section = document.querySelector(`#${sectionId}`);

    let carouselElements = section.querySelectorAll('.carousel__movie');

    for (let i = 0; i < 5; i++) {
        let moviePromiseResponse = moviesPromises.then((value) => {
            return value[0];
        }).then((value) => {
            return value[i];
        });
        update_movie_data(carouselElements[i], moviePromiseResponse);
    }

    for (let i = 0; i < 2; i++) {
        let moviePromiseResponse = moviesPromises.then((value) => {
            return value[1];
        }).then((value) => {
            return value[i];
        });
        update_movie_data(carouselElements[i + 5], moviePromiseResponse);
    }


}

function update_movie_data(modalContentElement, moviePromiseResponse) {

    moviePromiseResponse.then((value) => {
        // movie thumbnail
        let modalMovieThumbnailElement = modalContentElement.querySelectorAll("img");
        modalMovieThumbnailElement.forEach(element => element.src = value.image_url);

        // movie-title
        let movieTitleElement = modalContentElement.querySelector('#movie-title');
        movieTitleElement.textContent = 'Titre : ' + value.title;

        // movie-genres
        let movieGenresElement = modalContentElement.querySelector('#movie_genres');
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
var modal_elements = document.querySelectorAll(".modal");

// Generate HTML modal template
function generate_modal_HTML(id) {
    let movie = moviesIds[id];
    let modal_HTML_output = `<!-- Modal content -->
    <div class="modal-content">
        <div>
            <img id="modal-movie-thumbnail" class="modal__movie__thumbnail" src="assets/` + movie + `_placeholder.png"/>
            <p id="movie-title" class="movie__title">Titre : ` + movie + `_TITLE_placeholder</p>
            <p id="movie_genres" class="movie__genres">Genre Complet : ` + movie + `_GENRES_placeholder</p>
            <p id= "movie-year" class="movie__year">Date de sortie : ` + movie + `_YEAR_placeholder</p>
            <p id="movie-rated" class="movie__rated">Rated : ` + movie + `_RATED_placeholder</p>
            <p id="movie-imdb-score" class="movie__imdb_score">Score Imdb : ` + movie + `_IMDB_SCORE_placeholder</p>
        </div>
        <div>
            <p id="movie-directors" class="movie__directors">Réalisateur : ` + movie + `_DIRECTORS_placeholder</p>
            <p id="movie-actors" class="movie__actors">Liste des acteurs : ` + movie + `_ACTORS_placeholder</p>
            <p id="movie-duration" class="movie__duration">Durée : ` + movie + `_DURATION_placeholder</p>
            <p id="movie-country" class="movie__country">Pays d\'origine : ` + movie + `_COUNTRY_placeholder</p>
            <p id="movie-box-office-score" class="movie__box_office_score">Résultat au Box Office : ` + movie + `_BOX_OFFICE_SCORE_placeholder</p>
            <p id="movie-summary" class="movie__summary">Résumé du film : ` + movie + `_SUMMARY_placeholder</p>
        </div>
        <span class="close">&times;</span>
    </div>`
    return modal_HTML_output
}

// Inserting all modals in HTML
for (let i = 0; i < modal_elements.length; i++) {
    modal_elements[i].innerHTML = generate_modal_HTML(i);
}


// Get the button that opens the modal
var modal__trigger_elements = document.querySelectorAll(".modal__trigger");

// Get the <span> element that closes the modal
var span_elements = document.querySelectorAll(".close");

// When the user clicks on the modal__triggers, open the modal
for (let i = 0; i < modal__trigger_elements.length; i++) {
    modal__trigger_elements[i].onclick = function () {
        modal_elements[i].style.display = "block";
    }
}
// When the user clicks on <span> (x), close the modal
for (let i = 0; i < span_elements.length; i++) {
    span_elements[i].onclick = function () {
        modal_elements[i].style.display = "none";
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    for (let i = 0; i < modal_elements.length; i++) {
        if (event.target == modal_elements[i]) {
            modal_elements[i].style.display = "none";
        }
    }
}
// When the user press EscapeKey, close it
window.addEventListener('keydown', function (event) {
    for (let i = 0; i < modal_elements.length; i++) {
        if (event.key === 'Escape') {
            modal_elements[i].style.display = 'none'
        }
    }
})

