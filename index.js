require("dotenv").config();
const express = require('express');
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

//  Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, './public/assets')));

const Octokit = require("@octokit/rest");
const octokit = new Octokit();

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
// octokit.repos
//   .listForOrg({
//     org: "octokit",
//     type: "public"
//   })
//   .then(({ data }) => {
//     // handle data
//     console.log(data);
//   });

//  MongoDB connection
const mongoUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@hackday-shard-00-00-ubd8l.mongodb.net:27017,hackday-shard-00-01-ubd8l.mongodb.net:27017,hackday-shard-00-02-ubd8l.mongodb.net:27017/test?ssl=true&replicaSet=HackDay-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGODB_URI || mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//  Express routes
const routes = require("./controllers");
app.use(routes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`GitHub app listening on port ${port}!`));
