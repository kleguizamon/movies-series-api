class MoviesController {
  constructor(movieService) {
    this.movieService = movieService;
  }
  //getMovies
  async getMovies(req, res) {
    const { page } = req.query;
    let offset = 0;
    let limit = 10;

    if (req.user) {
      if (page) {
        try {
          offset = 3 * (page - 1);
          const movie = await this.movieService.getMovie(offset, limit);
          res.status(200).json(movie);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        try {
          const movie = await this.movieService.getMovie();
          res.status(200).json(movie);
        } catch (e) {
          console.log(e);
          res.status(500).send("Error receiving");
        }
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  }
  //getMoviesById
  async getMoviesById(req, res) {
    const { id } = req.params;
    try {
      const movie = await this.movieService.getMovieById(id);
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  //AddMovies
  async addMovies(req, res) {
    const { body } = req;
    const { name, category, type } = body;
    const { filename } = req.file;

    if (name && category && image && type && req.user) {
      const movie = {
        name: name,
        category: category,
        image: filename,
        type: type,
      };
      console.log(movie);
      try {
        await this.movieService.addMovie(movie);
        res.status(200).json("Added Movie");
      } catch (error) {
        res
          .status(500)
          .json(
            `The following error occurred while adding the movie - ${error}`
          );
      }
    } else {
      !req.user
        ? res.status(401).send("Unauthorized")
        : res.status(400).send("Not Found");
    }
  }

  //aditMovies

  async editMovies(req, res) {
    const { body } = req;
    const { id } = req.params;
    const { name, category, image, type } = body;

    if (name && category && image && type && req.user) {
      const movie = {
        name: name,
        category: category,
        image: image,
        type: type,
      };

      try {
        await this.movieService.editMovie(id, movie);
        res.status(200).json("Movie eddited");
      } catch (error) {
        res.status(500).json(`Error editing Movie or Serie - ${error}`);
      }
    } else {
      !req.user
        ? res.status(401).send("Unauthorized")
        : res.status(400).send("Information is missing");
    }
  }

  //deleteMovies

  async deleteMovies(req, res) {
    const { id } = req.params;
    try {
      await this.movieService.deleteMovie(id);
      res.status(200).json("Movie or Serie deleted");
    } catch (error) {
      res.status(500).json(`Error editing Movie or Serie - ${error}`);
    }
  }
}
module.exports = MoviesController;
