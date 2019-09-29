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

    languages: [{
      type: String,
      required: true
    }],

    events: [{
      type: String,
      required: true
    }]
  }],
});

module.exports = mongoose.model("GitHub", GitHubSchema);