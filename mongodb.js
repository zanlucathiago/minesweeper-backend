const { local_uri, remote_uri } = require('./config');
const mongoose = require('mongoose');

const uri = process.env.NODE_ENV !== 'production' ? local_uri : remote_uri;

// connect = (callback) => {
connect = () => {
  // mongoose.connect(uri, { useNewUrlParser: true }, async (err) => {
  mongoose.connect(
    uri,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    // await callback(err);
    // mongoose.disconnect();
    // });
  );
};

module.exports = connect;
