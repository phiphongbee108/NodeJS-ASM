const path = require("path");

const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/", movieController.goHome);

router.get("/movies", movieController.getAllMovie);

router.get("/trending?:page", movieController.getTrendingMovie);

router.get("/top-rate?:page", movieController.getTopRateMovie);

router.get("/discover?:genre?:page", movieController.getMovieByGenre);

router.post("/search", movieController.postSearchByKeyword);

module.exports = router;
