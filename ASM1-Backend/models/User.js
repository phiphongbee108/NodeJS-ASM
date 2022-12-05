const getDataFromFile = require("../utils/dataFolderLink");

module.exports = class User {
  static getAll(callback) {
    getDataFromFile(callback, "userToken");
  }
};
