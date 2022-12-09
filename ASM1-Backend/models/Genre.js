const getDataFromFile = require("../utils/dataFolderLink");

module.exports = class Genre {
  static getAll(callback) {
    getDataFromFile(callback, "genreList");
  }
};
