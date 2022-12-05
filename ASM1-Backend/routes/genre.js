const path = require("path");

const express = require("express");

const genreController = require("../controllers/genre");

const router = express.Router();

router.get("/genres", genreController.getAllGenre);

module.exports = router;
