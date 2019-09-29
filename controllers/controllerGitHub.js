require("dotenv").config();
const GitHubUsers = require("../models/GitHub");


var github = require('octonode');
var client = github.client(process.env.GITHUB_TOKEN);

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

      if (user === null) {
        console.log("could not find user");

        let newUser = {};

        //  Now we use Octonode to find the user and get the information needed
        client.get(`/users/${req.body.username}`, {}, (err, status, body, headers) => {
          if (err) throw err;

          newUser.username = body.login;
          newUser.githubId = body.id;
          newUser.avatar = body.avatar_url;
          
          if (body.email !== null) {
            newUser.email = body.email;
          }

          client.get(`/users/${newUser.username}/repos`, {}, function (err, status, body) {
            if (err) throw err;

            let repos = [];

            for (let i = 0; i < body.length; i++) {
              repos.push({
                repoId: body[i].id,
                url: body[i].html_url,
                name: body[i].name,
                owner: body[i].owner.login
              });
            }

            newUser.repos = repos;

            client.get(`/users/${newUser.username}/orgs`, {}, (err, status, data) => {
              console.log(data);
              newUser.orgs = data;

              for (let i = 0; i < repos.length; i++) {
                client.get(`/repos/${repos[i].owner}/${repos[i].name}/languages`, {}, (err, status, data) => {
                  if (err) throw err;
  
                  let objKeys = Object.keys(data);
                  let languages = [];
                  for (let j = 0; j < objKeys.length; j++) {
                    languages.push({
                      name: objKeys[j],
                      count: data[objKeys[j]]
                    });

                    if(j === (objKeys.length - 1)) {
                      newUser.repos[i].languages = languages;

                      if(i === (repos.length - 1)) {
                        GitHubUsers.create(newUser)
                          .then(dbUser => {
                            res.json(dbUser).status(200);
                          })
                          .catch(err => {
                            throw err;
                          });
                      }
                    }
                  }
                });
              }
            });
          });
        });
      } else {
        res.json(user).status(200);
      }
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