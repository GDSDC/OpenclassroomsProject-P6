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
const bestMoviePromise = bestRatedMovies.then((value) => {
    return value[0];
}).then((value) => {
    return value[0];
});


window.onload = function () {

    // Update best_movie_section
    update_section_hero('best_movie_section', bestMoviePromise);

    // Update top_rated_movies_section section
    update_section_carousel('top_rated_movies_section', bestRatedMovies, start = 1);

    // Update category_1_section section
    update_section_carousel('category_1_section', moviesAction);

    // Update category_2_section section
    update_section_carousel('category_2_section', moviesMusical);

    // Update category_3_section section
    update_section_carousel('category_3_section', moviesTrhiller);


}


function update_section_carousel(sectionId, moviesPromises, start = 0) {
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
        update_movie_data(carouselElements[i - start], moviePromiseResponse);
    }

    for (let i = 0; i < 2 + start; i++) {
        let moviePromiseResponse = moviesPromises.then((value) => {
            return value[1];
        }).then((value) => {
            return value[i];
        });
        update_movie_data(carouselElements[i + 5 - start], moviePromiseResponse);
    }


}

function update_section_hero(sectionId, moviePromiseResponse) {
    // Section Selection
    let section = document.querySelector(`#${sectionId}`);

    // Update Hero Info
    update_hero_info(section, moviePromiseResponse);

    // Update Modal
    update_movie_data(section, moviePromiseResponse);

}

function update_hero_info(modalContentElement, moviePromiseResponse) {

    moviePromiseResponse.then((value) => {
        // hero title
        let heroTitle = modalContentElement.querySelector("#hero-title");
        heroTitle.textContent = value.title;

        // hero description
        let heroDescription = modalContentElement.querySelector("#hero-description");
        heroDescription.textContent = value.description;
    });
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
    let movie = ["best_movie", "top_rated_movie_1", "top_rated_movie_2", "top_rated_movie_3", "top_rated_movie_4", "top_rated_movie_5", "top_rated_movie_6", "top_rated_movie_7", "category_1_movie_1", "category_1_movie_2", "category_1_movie_3", "category_1_movie_4", "category_1_movie_5", "category_1_movie_6", "category_1_movie_7", "category_2_movie_1", "category_2_movie_2", "category_2_movie_3", "category_2_movie_4", "category_2_movie_5", "category_2_movie_6", "category_2_movie_7", "category_3_movie_1", "category_3_movie_2", "category_3_movie_3", "category_3_movie_4", "category_3_movie_5", "category_3_movie_6", "category_3_movie_7"];
    let modal_HTML_output = `<!-- Modal content -->
    <div class="modal-content">
        <div>
            <img id="modal-movie-thumbnail" class="modal__movie__thumbnail" src="assets/${movie[id]}_placeholder.png"/>
            <p id="movie-title" class="movie__title">Titre : ${movie[id]}_TITLE_placeholder</p>
            <p id="movie_genres" class="movie__genres">Genre Complet : ${movie[id]}_GENRES_placeholder</p>
            <p id= "movie-year" class="movie__year">Date de sortie : ${movie[id]}_YEAR_placeholder</p>
            <p id="movie-rated" class="movie__rated">Rated : ${movie[id]}_RATED_placeholder</p>
            <p id="movie-imdb-score" class="movie__imdb_score">Score Imdb : ${movie[id]}_IMDB_SCORE_placeholder</p>
        </div>
        <div>
            <p id="movie-directors" class="movie__directors">Réalisateur : ${movie[id]}_DIRECTORS_placeholder</p>
            <p id="movie-actors" class="movie__actors">Liste des acteurs : ${movie[id]}_ACTORS_placeholder</p>
            <p id="movie-duration" class="movie__duration">Durée : ${movie[id]}_DURATION_placeholder</p>
            <p id="movie-country" class="movie__country">Pays d\'origine : ${movie[id]}_COUNTRY_placeholder</p>
            <p id="movie-box-office-score" class="movie__box_office_score">Résultat au Box Office : ${movie[id]}_BOX_OFFICE_SCORE_placeholder</p>
            <p id="movie-summary" class="movie__summary">Résumé du film : ${movie[id]}_SUMMARY_placeholder</p>
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

