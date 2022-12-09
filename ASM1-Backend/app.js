const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();

const movieRoute = require("./routes/movie");
// const genreRoute = require("./routes/genre");
// const userRoute = require("./routes/user");
const videoRoute = require("./routes/video");
const authRoute = require("./middleware/authorized");
const notFoundRoute = require("./routes/404");

app.use(cors());
app.use(express.json());

app.use(authRoute.route);
app.use("/api/movies", movieRoute.route);
// app.use(genreRoute.route);
// app.use(userRoute.route);
app.use("/api/movies", videoRoute.route);
app.use(notFoundRoute.route);

const server = http.createServer(app);
server.listen(5000);
