const User = require("../models/User");

exports.getAllUser = (request, response) => {
  User.getAll((users) => {
    console.log("users:", users.length);
  });
};
