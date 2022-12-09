const express = require("express");
const router = express.Router();

const videoController = require("../controllers/video");

// route trả về tất cả trailer
router.get("/videos", videoController.getAllVideo);

// route trả về trailer mới nhất
router.post("/video", videoController.getTrailer);

exports.route = router;
