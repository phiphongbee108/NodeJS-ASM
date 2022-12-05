const Movie = require("../models/movie");

const movieArrayLimit = 20;

exports.getAllMovie = (req, res, next) => {
  Movie.fetchAll((movies) => {
    res.render("movie/movie-list", {
      movies: movies,
      pageTitle: "All Movies",
      path: "/movies",
    });
  });
};

exports.getMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId, (movie) => {
    res.render("movie/movie-detail", {
      movie: movie,
      pageTitle: movie.title,
      path: "/movies",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Movie.fetchAll((movies) => {
    res.render("movie/index", {
      movies: movies,
      pageTitle: "Movie",
      path: "/",
    });
  });
};
