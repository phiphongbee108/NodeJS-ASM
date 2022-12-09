const Genre = require("../models/Genre");

exports.getAllGenre = (request, response) => {
  Genre.getAll((genre) => {
    console.log("genre:", genre.length);
  });
};
