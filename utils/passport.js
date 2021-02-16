const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserService = require("../services/userService");
const UserInstance = new UserService();

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    async (username, password, cb) => {
      try {
        const userData = await UserInstance.getByName(username.toLowerCase());
        //si no la resp de la query no da resultados
        if (!userData) {
          return cb(null, false);
        }

        const compare = await bcrypt.compare(password, userData.password);
        //si la comparacion entre password es erronea
        if (!compare) {
          return cb(null, false);
        }

        return cb(null, userData);
      } catch (e) {
        console.log(e);
        return cb(null, false);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.name);
});

passport.deserializeUser(async (name, cb) => {
  const dataUser = await UserInstance.getByName(name);
  cb(null, dataUser);
});