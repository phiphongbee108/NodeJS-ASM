const Genre = require("../models/Genre");

exports.getAllGenre = (req, res, next) => {
  Genre.fetchAll((genres) => {
    res.send(genres);
  });
};
