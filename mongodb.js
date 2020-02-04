const { local_uri, remote_uri } = require('./config');
const mongoose = require('mongoose');

const uri = remote_uri;

connect = (callback) => {
  mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    callback(err);
  });
};

module.exports = connect;
