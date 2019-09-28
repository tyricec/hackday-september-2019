const express = require('express')
const app = express()
const port = 3000

var github = require('octonode');
var client = github.client('92b481f935266a77628a2ef581ef724fb00c88f2');

// Then we instantiate a client with or without a token (as show in a later section)

var ghme = client.get('/users/SJT1988', {}, function (err, status, body, headers) {
  console.log(body); //json object
  console.log(err); //json object
});
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
