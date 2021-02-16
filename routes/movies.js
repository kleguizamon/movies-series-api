const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAdmin = require("../utils/checkAdmin");
const MovieController = require("../controllers/movieController");
const MovieService = require("../services/movieService");
const MovieInstance = new MovieController(new MovieService());

router.get("/", function (req, res, next) {
  MovieInstance.getMovies(req, res);
});
router.get("/:id", function (req, res, next) {
  MovieInstance.getMoviesById(req, res);
});
//call Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), checkAdmin, function (req, res, next) {
  MovieInstance.addMovies(req, res);
});

router.put("/:id", upload.single("image"), checkAdmin,function (req, res, next) {
  MovieInstance.editMovies(req, res);
});
router.delete("/:id",checkAdmin, function (req, res, next) {
  MovieInstance.deleteMovies(req, res);
});

module.exports = router;
