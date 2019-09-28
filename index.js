const express = require('express')
const app = express()
const port = 3000
const Octokit = require("@octokit/rest");
const octokit = new Octokit();

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokit.repos
  .listForOrg({
    org: "octokit",
    type: "public"
  })
  .then(({ data }) => {
    // handle data
    console.log(data);
  });

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
