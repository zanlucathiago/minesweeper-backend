const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('./mongodb');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Record = require('./models/record');
// Level = require('./models/level');

mongodb();
// config.MONGODB_URI,
// { useNewUrlParser: true },

app.use('/api/record', require('./routes/api/record'));
// app.use('/api/level', require('./routes/api/level'));
app.use('/api/player', require('./routes/api/player'));
// app.use('/api/login', require('./routes/api/login'));
app.use('/api/mail', require('./routes/api/mail'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
