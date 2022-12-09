const getDataFromFile = require("../utils/dataFolderLink");

module.exports = class Movie {
  static getAll(callback) {
    getDataFromFile(callback, "movieList");
  }
};
