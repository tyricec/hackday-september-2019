const express = require('express')
const app = express()
const port = 3000

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
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
