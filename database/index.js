const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // let repoSchema = mongoose.Schema({
  //   gitId: {type: Number, unique: true},
  //   name: String,
  //   html_url: String,
  //   url: String,
  //   description: String,
  // });
  // let Repo = mongoose.model('Repo', repoSchema);
  console.log('Schema created!');
});

let repoSchema = mongoose.Schema({
  gitId: {type: Number, unique: true},
  name: String,
  html_url: String,
  url: String,
  description: String,
  dateAdded: String,
});
let Repo = mongoose.model('Repo', repoSchema);



const save = (rawObj) => {
  // console.log('raw obj is', JSON.parse(rawObj));
  const parsedArr = JSON.parse(rawObj);
  const promiseArr = [];
  const username = parsedArr[0].name;
  let repoCount = parsedArr.length;
  parsedArr.forEach((repo) => {
    const { name, html_url, url, description } = repo;
    const gitId = repo.id;
    const dateAdded = (new Date()).toString();
    promiseArr.push(new Promise((resolve, reject) => {
      const entry = new Repo({ name, html_url, url, description, gitId, dateAdded });
      entry.save((err, entry) => {
        if (err) {
          reject(err);
        } else {
          resolve(entry);
        }
      })
    }));
  });

  return Promise.all(promiseArr)
                .then((values) => {
                  return { values, username, repoCount };
                })
                .catch((reason) => {
                  // console.error('error in db promsises', reason);
                });
}

const fetchRepos = (callback) => {
  //NOTE: Delete Repo.remove when data should propogate and done with testing
  Repo.find().limit(25).sort('-dateAdded').exec((err, repos) => {
    callback(err, null, repos);
  })
  // Repo.remove((err) => {
  //   Repo.find((err, repos) => {
  //     callback(err, null, repos);
  //   });
  // });
};

module.exports.save = save;
module.exports.fetchRepos = fetchRepos;
