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
    let movies_filtered = [];
    let next = 'ok';

// Request Onload
    xhr.onload = function () {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            // Fill in genres variable
            for (let movie in data.results) {
                movies_filtered.push(data.results[movie]);
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
    return movies_filtered;
}

function get_movie_details(movie_id) {
// Initiate Request
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/v1/titles/" + movie_id);
    xhr.send();

// Initiate variables
    let movie_details = [];

// Request Onload
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Fill in movie details
            movie_details.push(xhr.responseText);
        } else if (xhr.status === 404) {
            console.log("No records found")
        }
    }
    return movie_details[0];
}

movies_action = get_movies_filtered('imdb_score_min=8.8&genre=Action');
movies_musical = get_movies_filtered('imdb_score_min=8.8&genre=Musical');
movies_trhiller = get_movies_filtered('imdb_score_min=8.8&genre=Thriller');
best_rated_movies = get_movies_filtered('imdb_score_min=9');

const category_movies_test = [
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

const movie_details_test = {
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

var best_rated_movies_details = [];


window.onload = function () {

    // for (let i = 0; i < 7; i++) {
    //     best_rated_movies_details.push(get_movie_details(category_movies_test[i].id));
    // }

    console.log(movies_action);
    console.log(movies_musical);
    console.log(movies_trhiller);
    console.log(best_rated_movies);
    console.log(best_rated_movies_details);

    var section_test = document.getElementById('top_rated_movies_section');
    var modal_content_test = section_test.getElementsByClassName('modal-content');
    update_modal_content(modal_content_test[0], movie_details_test);

    // for (let i = 0; i < modal_content_test.length; i++) {
    //     update_modal_content(modal_content_test[i], best_rated_movies_details[i]);
    // }
}


function update_modal_content(modal_content_element, movie_data) {
    // movie thumbnail
    let modal__movie__thumbnail_element = modal_content_element.getElementsByClassName('modal__movie__thumbnail')[0];
    modal__movie__thumbnail_element.src = movie_data.image_url;

    // movie__title
    let movie__title_element = modal_content_element.getElementsByClassName('movie__title')[0];
    movie__title_element.textContent = 'Titre : ' + movie_data.title;

    // movie__genres
    let movie__genres_element = modal_content_element.getElementsByClassName('movie__genres')[0];
    movie__genres_element.textContent = 'Genre Complet : ' + movie_data.genres;

    // movie__year
    let movie__year_element = modal_content_element.getElementsByClassName('movie__year')[0];
    movie__year_element.textContent = 'Date de sortie : ' + movie_data.year;

    // movie__rated
    let movie__rated_element = modal_content_element.getElementsByClassName('movie__rated')[0];
    movie__rated_element.textContent = 'Rated : ' + movie_data.rated;

    // movie__imdb_score
    let movie__imdb_score_element = modal_content_element.getElementsByClassName('movie__imdb_score')[0];
    movie__imdb_score_element.textContent = 'Score Imdb : ' + movie_data.imdb_score;

    // movie__directors
    let movie__directors_element = modal_content_element.getElementsByClassName('movie__directors')[0];
    movie__directors_element.textContent = 'Réalisateur : ' + movie_data.directors;

    // movie__actors
    let movie__actors_element = modal_content_element.getElementsByClassName('movie__actors')[0];
    movie__actors_element.textContent = 'Liste des acteurs : ' + movie_data.actors;

    // movie__duration
    let movie__duration_element = modal_content_element.getElementsByClassName('movie__duration')[0];
    movie__duration_element.textContent = 'Durée :  ' + movie_data.duration + ' minutes';

    // movie__country
    let movie__country_element = modal_content_element.getElementsByClassName('movie__country')[0];
    movie__country_element.textContent = 'Pays d\'origine : ' + movie_data.countries;

    // movie__box_office_score
    let movie__box_office_score_element = modal_content_element.getElementsByClassName('movie__box_office_score')[0];
    movie__box_office_score_element.textContent = 'Résultat au Box Office : ' + movie_data.worldwide_gross_income + ' $';

    // movie__summary
    let movie__summary_element = modal_content_element.getElementsByClassName('movie__summary')[0];
    movie__summary_element.textContent = 'Résumé du film : ' + movie_data.long_description;
}

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

