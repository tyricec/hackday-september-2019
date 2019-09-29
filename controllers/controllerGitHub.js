const GitHubUsers = require("../models/GitHub");

module.exports = {
  createUser: async (req, res) => {
    try {
      let user = await GitHubUsers.create(req.body);
      res.json(user).status(200);
    }

    catch (err) {
      console.log(err);
      res.status(500).json({
        message: "There was an error adding this GitHub user"
      });
    }
  },

  findUsername: async (req, res) => {
    try {
      let user = await GitHubUsers.findOne({
        username: req.body.username
      });

      console.log(user);
      res.json(user).status(200);
    }

    catch (err) {
      console.log(err);
      res.status(404).json({
        message: "Could not find a user with that username"
      });
    }
  },

  findEmail: async (req, res) => {
    try {
      let user = await GitHubUsers.findOne({
        email: req.body.email
      });

      res.json(user).status(200);
    }

    catch (err) {
      console.log(err);
      res.status(404).json({
        message: "Could not find a user with that email"
      });
    }
  }
}