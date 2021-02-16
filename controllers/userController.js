class UsersController {
  constructor(userService) {
    this.userService = userService;
  }

  //getUsers
  async getUsers(req, res) {
    try {
      const user = await this.userService.getUser();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  //getUsersById
  async getUsersById(req, res) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  //AddUsers
  async addUsers(req, res) {
    const { body } = req;
    const name = body.name.toLowerCase();
    const { password } = body;

    if (body && name && password) {
      try {
        const user = await this.userService.addUser({ ...body, name });
        res.status(200).json(user);
      } catch (e) {
        console.log(e);
        res.status(500).send("Creation failed");
      }
    } else {
      res.status(400).send("Not Found");
    }
  }

  //aditUsers
  async editUsers(req, res) {
    const { body } = req;
    const { id } = req.params;
    const { name, password, isAdmin } = body;
    if (name && password && req.user) {
      const user = {
        name: name,
        password: password,
        isAdmin: isAdmin,
      };

      try {
        await this.userService.editUser(id, user);
        res.status(200).json("User eddited");
      } catch (error) {
        res.status(500).json(`Error editing User - ${error}`);
      }
    } else {
      !req.user
        ? res.status(401).send("Unauthorized")
        : res.status(400).send("Not Found");
    };
  };

  //deleteUsers
  async deleteUsers(req, res) {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(id);
      res.status(200).json("User deleted");
    } catch (error) {
      res.status(500).json(`Error editing User - ${error}`);
    }
  }
}

module.exports = UsersController;
