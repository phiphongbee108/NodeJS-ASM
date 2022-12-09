const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// route trả về danh sách người dùng
router.get("/users", userController.getAllUser);

exports.route = router;
