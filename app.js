const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const routes = require('./routes');
app.use(cors());
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Record = require('./models/record');
Level = require('./models/level');

mongoose.connect('mongodb://127.0.0.1/minesweeper');

// Members API Routes
app.use('/api/record', require('./routes/api/record'));
app.use('/api/level', require('./routes/api/level'));
app.use('/api/player', require('./routes/api/player'));
app.use('/api/login', require('./routes/api/login'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
