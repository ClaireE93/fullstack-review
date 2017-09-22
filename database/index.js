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
});
let Repo = mongoose.model('Repo', repoSchema);



const save = (rawObj) => {
  // console.log('raw obj is', JSON.parse(rawObj));
  const parsedArr = JSON.parse(rawObj);
  const promiseArr = [];
  parsedArr.forEach((repo) => {
    const { name, html_url, url, description } = repo;
    const gitId = repo.id;
    promiseArr.push(new Promise((resolve, reject) => {
      const entry = new Repo({ name, html_url, url, description, gitId });
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
                  return values;
                })
                .catch((reason) => {
                  // console.error('error in db promsises', reason);
                });



  // const { name, html_url, url, description } = parsedObj;
  // const gitId = parsedObj.id;
  // console.log('OBJECT TO SAVE:', { name, html_url, url, description, gitId });

  // return new Promise((resolve, reject) => {
  //   const entry = new Repo({ name, html_url, url, description, gitId });
  //   entry.save((err, entry) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(entry);
  //     }
  //   });
  // });
}

const fetchEntries = () => {

};

module.exports.save = save;
module.exports.fetchEntries = fetchEntries;
