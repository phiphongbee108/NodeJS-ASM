const fs = require("fs");
const path = require("path");

const genre = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const getGenresFromFile = (cb) => {
  fs.readFile(genre, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Genre {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static fetchAll(cb) {
    getGenresFromFile(cb);
  }
};
