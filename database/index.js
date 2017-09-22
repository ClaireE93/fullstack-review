const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  let repoSchema = mongoose.Schema({
    gitId: Number,
    name: String,
    html_url: String,
    url: String,
    description: String,
  });
  let Repo = mongoose.model('Repo', repoSchema);
  console.log('Repo created!');
});



let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
