function checkAdmin(req, res, next) {
  if (req.user) {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not admin");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = checkAdmin;