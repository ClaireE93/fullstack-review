const request = require('request');
const config = require('../config.js');
const dbHelpers = require('../database/index');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request(options, (err, response, body) => {
    const parsedBody = JSON.parse(body);
    if (parsedBody.length) {
      dbHelpers.save(parsedBody)
      .then((data) => {
        callback(err, data);
      })
      .catch((error) => {
        console.error('database save error', error);
        callback(error);
      })
    } else {
      const error = {statusCode: '404 Not Found'};
      callback(error);
    }
  });
};

module.exports.getReposByUsername = getReposByUsername;
