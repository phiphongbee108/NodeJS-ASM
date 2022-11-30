const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },
};
