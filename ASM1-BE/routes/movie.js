const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movie");

// route trả về tất cả phim
router.get("/all", movieController.getAllMovie);

// route trả về danh sách phim trending
router.get("/trending?:page", movieController.getTrendingMovie);

// route trả về danh sách phim bình chọn cao
router.get("/top-rate?:page", movieController.getTopRateMovie);

// route trả về danh sách phim theo thể loại
router.get("/discover?:genre?:page", movieController.getMovieByGenre);

// route tìm kiếm phim theo từ khóa
router.post("/search", movieController.postSearchByKeyword);

exports.route = router;
