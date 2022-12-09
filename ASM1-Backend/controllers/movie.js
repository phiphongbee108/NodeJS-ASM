const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const { response } = require("express");

// const fs = require("fs");
// const path = require("path");
// const folderLink = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "testDataOutput.json"
// );

const movieArrayLimit = 20;

exports.getAllMovie = (request, response) => {
  Movie.getAll((movies) => {
    console.log("movies:", movies.length);
  });
};

// paging danh sách phim, 20 phim/page
const pagingMovieList = (movies, page) => {
  const result = { movies: [], page: 1, totalPage: 0 };
  let tempArray = [];
  // đóng gói phim vào từng page
  movies.forEach((movie) => {
    if (tempArray.length === movieArrayLimit) {
      result.totalPage++;
      result.movies.push(tempArray);
      tempArray = [];
      tempArray.push(movie);
    } else {
      tempArray.push(movie);
    }
  });
  result.totalPage++;
  result.movies.push(tempArray);
  // chuyển list sau khi paging ra file đánh giá output
  // fs.writeFile(folderLink, JSON.stringify(result.movies), (err) => {
  //   err ? console.log("err:", err) : "";
  // });
  // chỉnh sửa biến result trước khi return
  result.movies = [...result.movies[page - 1]];
  if (page > 1 && page != undefined) {
    result.page = page;
  }
  return result;
};

// xử lí trả về danh sách phim trending
exports.getTrendingMovie = (request, response) => {
  const currentPage = request.query.page ? parseInt(request.query.page) : 1;
  Movie.getAll((movies) => {
    movies.sort((a, b) => b.popularity - a.popularity);
    const result = pagingMovieList(movies, currentPage);
    // console.log("result:",result);
    response.send(result);
  });
};

// xử lí trả về danh sách phim bình chọn cao
exports.getTopRateMovie = (request, response) => {
  const currentPage = request.query.page ? parseInt(request.query.page) : 1;
  Movie.getAll((movies) => {
    movies.sort((a, b) => b.vote_average - a.vote_average);
    const result = pagingMovieList(movies, currentPage);
    // console.log("result:",result);
    response.send(result);
  });
};

// xử lí trả về danh sách phim theo thể loại
exports.getMovieByGenre = (request, response, next) => {
  const genreID = parseInt(request.query.genre);
  // console.log("genreID:", genreID);
  if (!genreID) {
    response.statusMessage = "Not found gerne parram";
    response.status(400).end();
  }
  if (genreID) {
    // gán số trang hiện tại để trả về response
    const currentPage = request.query.page ? parseInt(request.query.page) : 1;
    Movie.getAll((movies) => {
      Genre.getAll((genres) => {
        const movieByGenre = [];
        // lọc thể loại theo request id
        const genre = genres.find((genre) => genre.id === genreID);
        if (genre) {
          // lọc phim theo thể loại
          movies.forEach((movie) => {
            if (movie.genre_ids != undefined) {
              const foundGenreID = movie.genre_ids.find(
                (item) => item === genreID
              );
              if (foundGenreID) {
                movieByGenre.push(movie);
              }
            }
          });
          // console.log("movieByGenre:", movieByGenre.length);
          const result = pagingMovieList(movieByGenre, currentPage);
          response.send({ ...result, genreName: genre.name });
        } else {
          response.statusMessage = `Not found gerne id ${genreID} `;
          response.status(400).end();
        }
      });
    });
  }
};

// xử lí trả về danh sách phim theo từ khóa tìm kiếm
exports.postSearchByKeyword = (request, response) => {
  const keyword = request.body.keyword;
  console.log("keyword:", keyword);
  if (!keyword) {
    response.statusMessage = "Not found keyword parram";
    response.status(400).end();
  }
  Movie.getAll((movies) => {
    const searchMovies = [];
    let existInOverview, existInTitle;
    // lọc phim có tên hoặc mô tả chứa từ khóa cần tìm
    movies.forEach((movie) => {
      if (movie.title) {
        existInTitle = movie.title.toLowerCase().search(keyword);
      }
      if (movie.overview) {
        existInOverview = movie.overview.toLowerCase().search(keyword);
      }
      if (existInOverview >= 0 || existInTitle >= 0) {
        searchMovies.push(movie);
      }
    });
    const result = pagingMovieList(searchMovies, 1);
    response.send(result);
  });
};
