const Genre = require("../models/Genre");

exports.getAllGenre = (request, response) => {
  Genre.getAll((genre) => {
    response.send(genre);
  });
};
