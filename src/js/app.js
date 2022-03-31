const movies_ids = ["best_movie_IMG", "top_rated_movie_1", "top_rated_movie_2", "top_rated_movie_3", "top_rated_movie_4", "top_rated_movie_5", "top_rated_movie_6", "top_rated_movie_7", "category_1_movie_1", "category_1_movie_2", "category_1_movie_3", "category_1_movie_4", "category_1_movie_5", "category_1_movie_6", "category_1_movie_7", "category_2_movie_1", "category_2_movie_2", "category_2_movie_3", "category_2_movie_4", "category_2_movie_5", "category_2_movie_6", "category_2_movie_7", "category_3_movie_1", "category_3_movie_2", "category_3_movie_3", "category_3_movie_4", "category_3_movie_5", "category_3_movie_6", "category_3_movie_7"]


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

// // Display Images
// for (let i = 0; i < movies_ids.length; i++) {
//     document.getElementById(movies_ids[i]).append(get_movie_image(movies_ids[i]));
// }

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8000/api/v1/genres/");
xhr.send()

xhr.onload = function () {
    if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        console.log(data.count);
        console.log(data.products);
    } else if (xhr.status === 404) {
        console.log("No records found")
    }
}