const path = require("path");

const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/", movieController.getIndex);

router.get("/movies", movieController.getAllMovie);

module.exports = router;
