const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAdmin = require("../utils/checkAdmin");
const UserController = require("../controllers/userController");
const UserService = require("../services/userService");
const UserInstance = new UserController(new UserService());

router.get("/", checkAdmin, function (req, res, next) {
  UserInstance.getUsers(req, res);
});
//Login
router.post('/login', passport.authenticate('local'), function(req, res, next){
  const userInfo = {
    id: req.user._id,
    user: req.user.name
  }
  return res.json(userInfo);
});
router.get("/:id", function (req, res, next) {
  UserInstance.getUsersById(req, res);
});
router.post("/", function (req, res, next) {
  UserInstance.addUsers(req, res);
});
router.put("/:id", checkAdmin, function (req, res, next) {
  UserInstance.editUsers(req, res);
});
router.delete("/:id", checkAdmin,  function (req, res, next) {
  UserInstance.deleteUsers(req, res);
});

module.exports = router;