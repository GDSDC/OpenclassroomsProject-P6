const movies_ids = ["best_movie", "top_rated_movie_1", "top_rated_movie_2", "top_rated_movie_3", "top_rated_movie_4", "top_rated_movie_5", "top_rated_movie_6", "top_rated_movie_7", "category_1_movie_1", "category_1_movie_2", "category_1_movie_3", "category_1_movie_4", "category_1_movie_5", "category_1_movie_6", "category_1_movie_7", "category_2_movie_1", "category_2_movie_2", "category_2_movie_3", "category_2_movie_4", "category_2_movie_5", "category_2_movie_6", "category_2_movie_7", "category_3_movie_1", "category_3_movie_2", "category_3_movie_3", "category_3_movie_4", "category_3_movie_5", "category_3_movie_6", "category_3_movie_7"]

function get_movies_images_json() {
    return fetch("src/tests/img/JSON/movies_images.json")
        .then(response => {
            return response.json();
        })
        .then(data => console.log(data));
}


function get_movie_image(id) {
    let movie_img = document.createElement("img");
    movie_img.src = "src/tests/img/PNG/" + id + ".png";
    movie_img.className = "thumbnail"
    return movie_img;
}

// var genres = [];

function get_movie_genres() {
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

genres = get_movie_genres();

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

delay(100).then(() => console.log(genres));


function get_movies_filtered(filter_input) {
// Initiate Request
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/v1/titles/?" + filter_input);
    xhr.send();

// Initiate variables
    let movies_by_genre = [];
    let next = 'ok';

// Request Onload
    xhr.onload = function () {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            // Fill in genres variable
            for (let movie in data.results) {
                movies_by_genre.push(data.results[movie]);
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
    return movies_by_genre;
}

movies_action = get_movies_filtered('imdb_score_min=8.8&genre=Action');
movies_musical = get_movies_filtered('imdb_score_min=8.8&genre=Musical');
movies_trhiller = get_movies_filtered('imdb_score_min=8.8&genre=Thriller');
best_rated_movies = get_movies_filtered('imdb_score_min=9');

delay(500).then(() => console.log(movies_action));
delay(500).then(() => console.log(movies_musical));
delay(500).then(() => console.log(movies_trhiller));
delay(250).then(() => console.log(best_rated_movies));


// Get the modal
var modal_elements = document.querySelectorAll(".modal");

// Generate HTML modal template
function generate_modal_HTML(id) {
    let modal_HTML_output = `<!-- Modal content -->
    <div class="modal-content">
        <div>
            <img class="modal__movie__thumbnail" src="assets/` + movies_ids[id] + `_placeholder.png"/>
            <p class="movie__title">Titre : ` + movies_ids[id] + `_TITLE_placeholder</p>
            <p class="movie__genres">Genre Complet : ` + movies_ids[id] + `_GENRES_placeholder</p>
            <p class="movie__year">Date de sortie : ` + movies_ids[id] + `_YEAR_placeholder</p>
            <p class="movie__rated">Rated : ` + movies_ids[id] + `_RATED_placeholder</p>
            <p class="movie__imdb_score">Score Imdb : ` + movies_ids[id] + `_IMDB_SCORE_placeholder</p>
        </div>
        <div>
            <p class="movie__directors">Réalisateur : ` + movies_ids[id] + `_DIRECTORS_placeholder</p>
            <p class="movie__actors">Liste des acteurs : ` + movies_ids[id] + `_ACTORS_placeholder</p>
            <p class="movie__duration">Durée : ` + movies_ids[id] + `_DURATION_placeholder</p>
            <p class="movie__country">Pays d\'origine : ` + movies_ids[id] + `_COUNTRY_placeholder</p>
            <p class="movie__box_office_score">Résultat au Box Office : ` + movies_ids[id] + `_BOX_OFFICE_SCORE_placeholder</p>
            <p class="movie__summary">Résumé du film : ` + movies_ids[id] + `_SUMMARY_placeholder</p>
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

