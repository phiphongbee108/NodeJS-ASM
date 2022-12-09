import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  //   baseURL: "https://api.themoviedb.org/3",
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      //   const request = await fetch(
      //     `https://api.themoviedb.org/3` + requests.fetchNetflixOriginals
      //   )
      //     .then((response) => console.log(response))
      //     .catch((err) => console.log(err));
      // console.log("request.data.movies.length:", request.data.movies.length);
      setMovie(
        request.data.movies[
          Math.floor(Math.random() * request.data.movies.length - 1)
        ]
      );
      // setMovie(
      //   request.data.results[
      //     Math.floor(Math.random() * request.data.results.length - 1)
      //   ]
      // );

      // Math.floor(Math.random() * request.data.results.length -1)
      return request;
    }
    fetchData();
  }, []);

  // console.log(movie)

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  // console.log("movie.backdrop_path:", movie.backdrop_path);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
				"https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
				)`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
