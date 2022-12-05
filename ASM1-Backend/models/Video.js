const getDataFromFile = require("../utils/dataFolderLink");

module.exports = class Video {
  static getAll(callback) {
    getDataFromFile(callback, "videoList");
  }
};
