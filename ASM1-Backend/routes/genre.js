const express = require("express");
const router = express.Router();

const genreController = require("../controllers/genre");

// route trả về danh sách thể loại
router.get("/genres", genreController.getAllGenre);

exports.route = router;
