const express = require('express')
const app = express()
const port = 3000

var github = require('octonode');
var client = github.client('a5366b3ba77c861e13ddce4a18f68b1b3f3b2fe0');

// Then we instantiate a client with or without a token (as show in a later section)

var ghme = client.get('/users/SirHexxus', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
