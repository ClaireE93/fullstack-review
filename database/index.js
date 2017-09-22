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
  user: String,
  gitId: {type: Number, unique: true},
  name: String,
  html_url: String,
  description: String,
  dateAdded: String,
  avatar: String,
});
let Repo = mongoose.model('Repo', repoSchema);



const save = (parsedArr) => {
  const promiseArr = [];
  const username = parsedArr[0].owner.login;
  let repoCount = parsedArr.length;
  parsedArr.forEach((repo) => {
    const { name, html_url, url, description } = repo;
    const user = repo.owner.login;
    const avatar = repo.owner.avatar_url
    const gitId = repo.id;
    const dateAdded = (new Date()).toString();
    const entry = new Repo({ name, html_url, description, gitId, dateAdded, user, avatar });
    const savePromise = entry.save();
    promiseArr.push(savePromise);
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
    callback(err, repos);
  });
  // Repo.remove((err) => {
  //   Repo.find((err, repos) => {
  //     callback(err, repos);
  //   });
  // });
};

module.exports.save = save;
module.exports.fetchRepos = fetchRepos;
