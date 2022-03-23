display_image()
{
    var a = document.createElement("img");
    a.src = "src/tests/img/PNG/top_rated_movie_1.png";
    document.body.appendChild(a);
}

document.getElementById("top_rated_movie_1").onload = function () {
    display_image()
};
