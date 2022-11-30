const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./utils/path");

const app = express();

const movieRoutes = require("./routes/movie");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use(movieRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
