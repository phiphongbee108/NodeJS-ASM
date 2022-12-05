const express = require("express");
const router = express.Router();

const User = require("../models/User");

// xác thực người dùng trước khi gửi response về FE
router.use("/api/movies", (request, response, next) => {
  const requestToken = request.query.token;
  //   console.log("requestToken:", requestToken);
  if (requestToken == undefined) {
    response.statusMessage = `Unauthorized: no user token`;
    response.status(401).end();
  }

  User.getAll((users) => {
    // tìm người dùng từ request token
    const user = users.find((user) => user.token === requestToken);
    if (user) {
      next();
    } else {
      response.statusMessage = `Unauthorized: no user found`;
      response.status(401).end();
    }
  });
});

exports.route = router;
