const express = require("express");
const router = express.Router();

router.use((request, response) => {
  // console.log("not found route");
  response.statusMessage = "Route not found";
  response.status(404).send({ mess: "Route not found" });
});

exports.route = router;
