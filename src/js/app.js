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

function getMovieDetails(movie_id) {
// Initiate Request
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/v1/titles/" + movie_id);
    xhr.send();

// Initiate variables
    let movieDetails = [];

// Request Onload
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Fill in movie details
            movieDetails.push(xhr.responseText);
        } else if (xhr.status === 404) {
            console.log("No records found")
        }
    }
    return movieDetails[0];
}

moviesAction = getMoviesFiltered('imdb_score_min=8.8&genre=Action');
moviesMusical = getMoviesFiltered('imdb_score_min=8.8&genre=Musical');
moviesTrhiller = getMoviesFiltered('imdb_score_min=8.8&genre=Thriller');
bestRatedMovies = getMoviesFiltered('imdb_score_min=9');

const categoryMoviesTest = [
    {
        "id": 50083,
        "url": "http://localhost:8000/api/v1/titles/50083",
        "imdb_url": "https://www.imdb.com/title/tt0050083/",
        "title": "La parola ai giurati",
        "year": 1957,
        "imdb_score": "9.0",
        "votes": 681074,
        "image_url": "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "directors": [
            "Sidney Lumet"
        ],
        "actors": [
            "E.G. Marshall",
            "Ed Begley",
            "Edward Binns",
            "George Voskovec",
            "Henry Fonda",
            "Jack Klugman",
            "Jack Warden",
            "John Fiedler",
            "Joseph Sweeney",
            "Lee J. Cobb",
            "Martin Balsam",
            "Robert Webber"
        ],
        "writers": [
            "Reginald Rose"
        ],
        "genres": [
            "Crime",
            "Drama"
        ]
    },
    {
        "id": 68646,
        "url": "http://localhost:8000/api/v1/titles/68646",
        "imdb_url": "https://www.imdb.com/title/tt0068646/",
        "title": "Il padrino",
        "year": 1972,
        "imdb_score": "9.2",
        "votes": 1598655,
        "image_url": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
        "directors": [
            "Francis Ford Coppola"
        ],
        "actors": [
            "Abe Vigoda",
            "Al Lettieri",
            "Al Pacino",
            "Diane Keaton",
            "Gianni Russo",
            "James Caan",
            "John Cazale",
            "John Marley",
            "Marlon Brando",
            "Richard Conte",
            "Richard S. Castellano",
            "Robert Duvall",
            "Rudy Bond",
            "Sterling Hayden",
            "Talia Shire"
        ],
        "writers": [
            "Francis Ford Coppola",
            "Mario Puzo"
        ],
        "genres": [
            "Crime",
            "Drama"
        ]
    },
    {
        "id": 71562,
        "url": "http://localhost:8000/api/v1/titles/71562",
        "imdb_url": "https://www.imdb.com/title/tt0071562/",
        "title": "Il padrino - Parte II",
        "year": 1974,
        "imdb_score": "9.0",
        "votes": 1116614,
        "image_url": "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
        "directors": [
            "Francis Ford Coppola"
        ],
        "actors": [
            "Al Pacino",
            "Bruno Kirby",
            "Diane Keaton",
            "Francesca De Sapio",
            "Frank Sivero",
            "G.D. Spradlin",
            "Gastone Moschin",
            "John Cazale",
            "Lee Strasberg",
            "Michael V. Gazzo",
            "Richard Bright",
            "Robert De Niro",
            "Robert Duvall",
            "Talia Shire",
            "Tom Rosqui"
        ],
        "writers": [
            "Francis Ford Coppola",
            "Mario Puzo"
        ],
        "genres": [
            "Crime",
            "Drama"
        ]
    },
    {
        "id": 84302,
        "url": "http://localhost:8000/api/v1/titles/84302",
        "imdb_url": "https://www.imdb.com/title/tt0084302/",
        "title": "Maratonci trce pocasni krug",
        "year": 1982,
        "imdb_score": "9.0",
        "votes": 14295,
        "image_url": "https://m.media-amazon.com/images/M/MV5BZmE4Njk2MWYtZDRlMy00OTAxLThlNWYtOTU3MGEwNTY4Nzc0XkEyXkFqcGdeQXVyMTAwNjUxNTkz._V1_UY268_CR6,0,182,268_AL_.jpg",
        "directors": [
            "Slobodan Sijan"
        ],
        "actors": [
            "Bogdan Diklic",
            "Bora Todorovic",
            "Danilo 'Bata' Stojkovic",
            "Dragoljub Milosavljevic-Gula",
            "Fahro Konjhodzic",
            "Jelisaveta 'Seka' Sablic",
            "Melita Bihali",
            "Mihajlo 'Bata' Paskaljevic",
            "Mija Aleksic",
            "Milivoje 'Mica' Tomic",
            "Miroslav Jovanovic",
            "Pavle Vuisic",
            "Radislav Lazarevic",
            "Veljko Mandic",
            "Zoran Radmilovic"
        ],
        "writers": [
            "Dusan Kovacevic"
        ],
        "genres": [
            "Comedy",
            "Drama"
        ]
    },
    {
        "id": 111161,
        "url": "http://localhost:8000/api/v1/titles/111161",
        "imdb_url": "https://www.imdb.com/title/tt0111161/",
        "title": "Le ali della libertà",
        "year": 1994,
        "imdb_score": "9.3",
        "votes": 2315277,
        "image_url": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "directors": [
            "Frank Darabont"
        ],
        "actors": [
            "Bob Gunton",
            "Brian Libby",
            "Clancy Brown",
            "David Proval",
            "Gil Bellows",
            "James Whitmore",
            "Jeffrey DeMunn",
            "Joseph Ragno",
            "Jude Ciccolella",
            "Larry Brandenburg",
            "Mark Rolston",
            "Morgan Freeman",
            "Neil Giuntoli",
            "Tim Robbins",
            "William Sadler"
        ],
        "writers": [
            "Frank Darabont",
            "Stephen King"
        ],
        "genres": [
            "Drama"
        ]
    },
    {
        "id": 170783,
        "url": "http://localhost:8000/api/v1/titles/170783",
        "imdb_url": "https://www.imdb.com/title/tt0170783/",
        "title": "Vchera",
        "year": 1988,
        "imdb_score": "9.0",
        "votes": 3110,
        "image_url": "https://m.media-amazon.com/images/M/MV5BNzYzMjcyMzA4NF5BMl5BanBnXkFtZTgwMjY5ODIxNjE@._V1_UY268_CR5,0,182,268_AL_.jpg",
        "directors": [
            "Ivan Andonov"
        ],
        "actors": [
            "Boris Lukanov",
            "Christine Bartlet",
            "Dimitar Goranov",
            "Georgi Rusev",
            "Georgi Staykov",
            "Hristo Shopov",
            "Kosta Tsonev",
            "Krasimir Rankov",
            "Maria Stefanova",
            "Nikola Rudarov",
            "Pavel Popandov",
            "Petar Popyordanov",
            "Sofiya Kuzeva",
            "Stoyan Aleksiev",
            "Svetla Todorova"
        ],
        "writers": [
            "Vlado Daverov"
        ],
        "genres": [
            "Drama"
        ]
    },
    {
        "id": 247025,
        "url": "http://localhost:8000/api/v1/titles/247025",
        "imdb_url": "https://www.imdb.com/title/tt0247025/",
        "title": "Voynata na taralezhite",
        "year": 1979,
        "imdb_score": "9.0",
        "votes": 759,
        "image_url": "https://m.media-amazon.com/images/M/MV5BMjEwMDIzOTc1NV5BMl5BanBnXkFtZTgwNDA0MDQxNjE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "directors": [
            "Ivanka Grybcheva"
        ],
        "actors": [
            "Angel Lambev",
            "Asen Kotsev",
            "Dimitar Ganev",
            "Dimitr Dimitrov",
            "Greta Gancheva",
            "Kliment Denchev",
            "Lyudmila Cheshmedzhieva",
            "Moris Assa",
            "Ognian Zheliazkov",
            "Stefan Danailov",
            "Stoycho Mazgalov",
            "Tzvetana Maneva",
            "Valcho Kamarashev",
            "Vassil Mihajlov",
            "Yevgeniya Bozhikova"
        ],
        "writers": [
            "Bratya Mormarevi",
            "Miryana Basheva"
        ],
        "genres": [
            "Comedy"
        ]
    }
];

const movieDetailsTest = {
    "id": 50083,
    "url": "http://localhost:8000/api/v1/titles/50083",
    "title": "La parola ai giurati",
    "original_title": "12 Angry Men",
    "year": 1957,
    "date_published": "1957-09-04",
    "duration": 96,
    "description": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    "long_description": "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young man is guilty or innocent of murdering his father. What begins as an open-and-shut case of murder soon becomes a detective story that presents a succession of clues creating doubt, and a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other. Based on the play, all of the action takes place on the stage of the jury room.",
    "avg_vote": "8.9",
    "imdb_score": "9.0",
    "votes": 681074,
    "metascore": "96.0",
    "budget": 350000,
    "budget_currency": "USD",
    "usa_gross_income": null,
    "worldwide_gross_income": 576,
    "reviews_from_users": 1605,
    "reviews_from_critics": 149,
    "image_url": "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "actors": [
        "E.G. Marshall",
        "Ed Begley",
        "Edward Binns",
        "George Voskovec",
        "Henry Fonda",
        "Jack Klugman",
        "Jack Warden",
        "John Fiedler",
        "Joseph Sweeney",
        "Lee J. Cobb",
        "Martin Balsam",
        "Robert Webber"
    ],
    "directors": [
        "Sidney Lumet"
    ],
    "writers": [
        "Reginald Rose"
    ],
    "genres": [
        "Crime",
        "Drama"
    ],
    "countries": [
        "USA"
    ],
    "languages": [
        "English"
    ],
    "rated": "Not rated or unkown rating",
    "company": "Orion-Nova Productions"
};

var bestRatedMoviesDetails = [];


window.onload = function () {

    // for (let i = 0; i < 7; i++) {
    //     best_rated_movies_details.push(get_movie_details(category_movies_test[i].id));
    // }

    console.log(moviesAction);
    console.log(moviesMusical);
    console.log(moviesTrhiller);
    console.log(bestRatedMovies);
    console.log(bestRatedMoviesDetails);

    var sectionTest = document.getElementById('top_rated_movies_section');
    var modalContentTest = sectionTest.getElementsByClassName('modal-content');
    update_modal_content(modalContentTest[0], movieDetailsTest);

    // for (let i = 0; i < modalContentTest.length; i++) {
    //     update_modal_content(modalContentTest[i], best_rated_movies_details[i]);
    // }
}


function update_modal_content(modalContentElement, movieData) {
    // movie thumbnail
    let modalMovieThumbnailElement = modalContentElement.getElementsByClassName('modal__movie__thumbnail')[0];
    modalMovieThumbnailElement.src = movieData.image_url;

    // movie__title
    let movie__titleElement = modalContentElement.getElementsByClassName('movie__title')[0];
    movie__titleElement.textContent = 'Titre : ' + movieData.title;

    // movie__genres
    let movie__genresElement = modalContentElement.getElementsByClassName('movie__genres')[0];
    movie__genresElement.textContent = 'Genre Complet : ' + movieData.genres;

    // movie__year
    let movie__yearElement = modalContentElement.getElementsByClassName('movie__year')[0];
    movie__yearElement.textContent = 'Date de sortie : ' + movieData.year;

    // movie__rated
    let movie__ratedElement = modalContentElement.getElementsByClassName('movie__rated')[0];
    movie__ratedElement.textContent = 'Rated : ' + movieData.rated;

    // movie__imdb_score
    let movie__imdb_scoreElement = modalContentElement.getElementsByClassName('movie__imdb_score')[0];
    movie__imdb_scoreElement.textContent = 'Score Imdb : ' + movieData.imdb_score;

    // movie__directors
    let movie__directorsElement = modalContentElement.getElementsByClassName('movie__directors')[0];
    movie__directorsElement.textContent = 'Réalisateur : ' + movieData.directors;

    // movie__actors
    let movie__actorsElement = modalContentElement.getElementsByClassName('movie__actors')[0];
    movie__actorsElement.textContent = 'Liste des acteurs : ' + movieData.actors;

    // movie__duration
    let movie__durationElement = modalContentElement.getElementsByClassName('movie__duration')[0];
    movie__durationElement.textContent = 'Durée :  ' + movieData.duration + ' minutes';

    // movie__country
    let movie__countryElement = modalContentElement.getElementsByClassName('movie__country')[0];
    movie__countryElement.textContent = 'Pays d\'origine : ' + movieData.countries;

    // movie__box_office_score
    let movie__box_office_scoreElement = modalContentElement.getElementsByClassName('movie__box_office_score')[0];
    movie__box_office_scoreElement.textContent = 'Résultat au Box Office : ' + movieData.worldwide_gross_income + ' $';

    // movie__summary
    let movie__summaryElement = modalContentElement.getElementsByClassName('movie__summary')[0];
    movie__summaryElement.textContent = 'Résumé du film : ' + movieData.long_description;
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

