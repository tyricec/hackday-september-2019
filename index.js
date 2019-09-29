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

//  Octonode for retrieving GitHub info
var github = require('octonode');
var client = github.client('d936733e408e75501abdae0002c47ec7528bf6ad');

// Then we instantiate a client with or without a token (as show in a later section)

/* var ghme = client.get('/users/SJT1988', {}, function (err, status, body, headers) {
  console.log(body); //json object
  console.log(err); //json object
});
*/

client.get('/users/SJT1988/repos', {}, function (err, status, body, headers) {
  console.log(body);
});
client.get('/users/SJT1988/orgs', {}, function (err, status, body) {

  console.log(body);
});
/*client.get('/:owner/:repo/languages', {}, function (err, status, body) {
  console.log(body);
});
*/

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
