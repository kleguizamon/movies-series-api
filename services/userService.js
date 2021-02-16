const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

class UsersService {
  getUser() {
    const query = Users.find().exec();
    return query;
  }
  getUserById(id) {
    const query = Users.find({ _id: id }).exec();
    return query;
  }
  async addUser(user) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;

      const newUser = new Users(user);
      return newUser.save();
    } catch (e) {
      console.log(e);
    }
  }

  editUser(id, User) {
    const query = Users.findOneAndUpdate({ _id: id }, User).exec();
    console.log(query);
    return query;
  }
  deleteUser(id) {
    const query = Users.deleteOne({ _id: id }).exec();
    console.log(query);
    return query;
  }
  //Get Passport
  getByName(name) {
    const query = Users.findOne({ name }).exec();
    return query;
  }
}

module.exports = UsersService;