const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

const { localURI, remoteURI } = require('./config');

const uri = process.env.NODE_ENV !== 'production' ? localURI : remoteURI;
// const uri = remote_uri;

// connect = (callback) => {
// const connect = () => {
// mongoose.connect(uri, { useNewUrlParser: true }, async (err) => {
mongoose.connect(
  uri,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  // await callback(err);
  // mongoose.disconnect();
  // });
);
// };
let gfs;

const { connection } = mongoose;

connection.once('open', () => {
  // Init stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    console.log('FILE');
    console.log(file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        console.log('BUFFER');
        console.log(buf);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        return resolve(fileInfo);
      });
    });
  },
});

const remove = async (filename) => {
  await new Promise((resolve, reject) =>
    gfs.remove({ filename, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        reject(err);
      }

      resolve(gridStore);
    }),
  );
};

const read = (filename, callback) => {
  gfs.files.findOne({ filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return callback('Não existe o arquivo solicitado');
    }
    const rs = gfs.createReadStream(file.filename);
    // File exists
    return callback(null, rs);
  });
};

const upload = multer({ storage }).single('file');

module.exports = {
  read,
  remove,
  upload,
  // storage,
};
// module.exports = connection;
