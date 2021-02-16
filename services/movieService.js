const Movies = require("../models/movieModel");

class MoviesService {
  getMovies(page, limit){
    const query = Movie.find().skip(page).limit(limit).exec();
    return query;
  };
  getMovieById(id) {
    const query = Movies.find({ _id: id }).exec();
    return query;
  }
  addMovie(Movie) {
    const newMovie = new Movies(Movie);
    return newMovie.save();
  }
  editMovie(id, Movie) {
    const query = Movies.findOneAndUpdate({ _id: id }, Movie).exec();
    return query;
  }
  deleteMovie(id) {
    const query = Movies.deleteOne({ _id: id }).exec();
    return query;
  }
}

module.exports = MoviesService;
