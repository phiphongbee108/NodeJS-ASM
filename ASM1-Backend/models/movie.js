const fs = require("fs");
const path = require("path");

const Movie = require("./movie");

const movie = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);

// const getMovesFromFile = (cb) => {
//   fs.readFile(movie, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Movie {
  constructor(
    adult,
    backdrop_path,
    id,
    title,
    original_language,
    original_title,
    overview,
    poster_path,
    media_type,
    genre_ids,
    popularity,
    release_date,
    video,
    vote_average,
    vote_count
  ) {
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.id = id;
    this.title = title;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.media_type = media_type;
    this.genre_ids = genre_ids;
    this.popularity = popularity;
    this.release_date = release_date;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }

  static fetchAll(cb) {
    getMoviesFromFile(cb);
  }
};
