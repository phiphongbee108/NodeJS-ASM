const Movie = require("../models/Movie");
const Genre = require("../models/Genre");

const movieArrayLimit = 20;

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

exports.goHome = (req, res, next) => {
  res.render("movie/index", {
    pageTitle: "Home",
    path: "/",
  });
};

exports.getAllMovie = (req, res, next) => {
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  Movie.fetchAll((movies) => {
    const result = pagingMovieList(movies, currentPage);
    // console.log("result:",result);
    res.send(result);
  });
};

// xử lí trả về danh sách phim trending
exports.getTrendingMovie = (req, res, next) => {
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  Movie.fetchAll((movies) => {
    movies.sort((a, b) => b.popularity - a.popularity);
    const result = pagingMovieList(movies, currentPage);
    // console.log("result:",result);
    res.send(result);
  });
};

// xử lí trả về danh sách phim bình chọn cao
exports.getTopRateMovie = (req, res, next) => {
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  Movie.fetchAll((movies) => {
    movies.sort((a, b) => b.vote_average - a.vote_average);
    const result = pagingMovieList(movies, currentPage);
    // console.log("result:",result);
    res.send(result);
  });
};

// xử lí trả về danh sách phim theo thể loại
exports.getMovieByGenre = (req, res, next) => {
  const genreID = parseInt(req.query.genre);
  // console.log("genreID:", genreID);
  if (!genreID) {
    res.statusMessage = "Not found gerne parram";
    res.status(400).end();
  }
  if (genreID) {
    // gán số trang hiện tại để trả về response
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;
    Movie.fetchAll((movies) => {
      Genre.fetchAll((genres) => {
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
          res.send({ ...result, genreName: genre.name });
        } else {
          res.statusMessage = `Not found gerne id ${genreID} `;
          res.status(400).end();
        }
      });
    });
  }
};

// xử lí trả về danh sách phim theo từ khóa tìm kiếm
exports.postSearchByKeyword = (req, res, next) => {
  const keyword = req.body.keyword;
  console.log("keyword:", keyword);
  if (!keyword) {
    res.statusMessage = "Not found keyword parram";
    res.status(400).end();
  }
  Movie.fetchAll((movies) => {
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
    res.send(result);
  });
};
