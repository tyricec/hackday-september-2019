const mongoose = require("mongoose");

const GitHubSchema = new mongoose.Schema({
  username: { //  GitHub users/login
    type: String,
    required: true
  },

  githubId: { //  GitHub ID
    type: String,
    required: true
  },

  email:  { //  GitHub users/email
    type: String
  },

  avatar: { //  GitHub users/avatarUrl
    type: String,
    required: true
  },

  repos: [{ //  GitHub users/githubUrl
    name: {
      type: String,
      required: true
    },

    url: {
      type: String,
      required: true
    },

    repoId: {
      type: String,
      required: true
    },

    owner: {
      type: String,
      required: true
    },

    languages: [{
      name: {
        type: String
      },

      count: {
        type: String
      }
    }]
  }],

  orgs: [{
    type: String
  }]
});

module.exports = mongoose.model("GitHub", GitHubSchema);