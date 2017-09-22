const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const dbHelpers = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  const username = req.body.username;
  const callback = (err, data) => { //TODO: Refactor to use ONE helper function for this and save callback
    if (err) {
      res.statusCode = 404;
      res.end(err.toString());
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    }
  };

  github.getReposByUsername(username, callback);
});

app.get('/repos', function (req, res) {
  const callback = (err, body) => { //TODO: Refactor to use ONE helper function for this and post callback
    if (err) {
      res.statusCode = 404;
      res.end(err.toString());
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(body));
    }
  };

  dbHelpers.fetchRepos(callback);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
