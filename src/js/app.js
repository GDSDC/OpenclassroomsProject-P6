const movies_ids = ["best_movie_IMG", "top_rated_movie_1", "top_rated_movie_2", "top_rated_movie_3", "top_rated_movie_4", "top_rated_movie_5", "top_rated_movie_6", "top_rated_movie_7", "category_1_movie_1", "category_1_movie_2", "category_1_movie_3", "category_1_movie_4", "category_1_movie_5", "category_1_movie_6", "category_1_movie_7", "category_2_movie_1", "category_2_movie_2", "category_2_movie_3", "category_2_movie_4", "category_2_movie_5", "category_2_movie_6", "category_2_movie_7", "category_3_movie_1", "category_3_movie_2", "category_3_movie_3", "category_3_movie_4", "category_3_movie_5", "category_3_movie_6", "category_3_movie_7"]

const best_movie_IMG_JSON = "src/tests/img/JSON/best_movie_IMG.json"

function get_movie_image_json(id) {
    let result_json = fetch("src/tests/img/JSON/" + id + ".json")
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            return text;
        });
    return result_json;
}

function get_movie_image(id) {
    let movie_img = document.createElement("img");
    movie_img.src = "src/tests/img/PNG/" + id + ".png";
    movie_img.className = "thumbnail"
    return movie_img;
}

// Display Images
for (let i = 0; i < movies_ids.length; i++) {
    document.getElementById(movies_ids[i]).append(get_movie_image(movies_ids[i]));
}

console.log(get_movie_image_json(movies_ids[0]));
