const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
// const mongodb = require('./mongodb');
// const Player = require('models/player');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Record = require('./models/record');
// Level = require('./models/level');

// mongodb();

// const mongoose = require('mongoose');
// const { localURI, remoteURI } = require('./config');

// const uri = process.env.NODE_ENV !== 'production' ? localURI : remoteURI;
// const uri = remote_uri;

// connect = (callback) => {
// const connect = () => {
// mongoose.connect(uri, { useNewUrlParser: true }, async (err) => {
// mongoose.connect(
//   uri,
//   { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
//   // await callback(err);
//   // mongoose.disconnect();
//   // });
// );

// };
// app.get('/api/files/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists',
//       });
//     }
//     // File exists
//     return res.json(file);
//   });
// });
// config.MONGODB_URI,
// { useNewUrlParser: true },
// app.put('/api/upload/:id', upload.single('file'), (req, res) => {
// res.json({ file: req.file });
// Player.findBy;
// res.send('Foto salva.');
// });

// app.delete('/api/files/:id', (req, res) => {
//   gfs.remove({ _id: req.params.id, root: 'uploads' }, (err) => {
//     if (err) {
//       return res.status(404).json({ err: err });
//     }

//     return res.send('Foto apagada.');
//   });
// });

app.use('/api/record', require('./routes/api/record'));
// app.use('/api/level', require('./routes/api/level'));
app.use('/api/player', require('./routes/api/player'));
// app.use('/api/login', require('./routes/api/login'));
app.use('/api/mail', require('./routes/api/mail'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
