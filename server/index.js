const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const dbHelpers = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const username = req.body.username;
  const callback = (err, response, body, data) => {
    if (err) {
      res.statusCode = 404;
      res.end(err.toString());
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(data)); //TODO: Send back success message
    }
  };

  github.getReposByUsername(username, callback);
});

app.get('/repos', function (req, res) {
  const callback = (err, response, body) => {
    if (err) {
      res.statusCode = 404;
      res.end(err.toString());
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(body)); //TODO: Send back success message
    }
  };

  dbHelpers.fetchRepos(callback);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
