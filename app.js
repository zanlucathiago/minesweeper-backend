const socketio = require('@feathersjs/socketio');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

const app = express(feathers());
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.configure(socketio());

app.use('/api/record', require('./routes/api/record'));
app.use('/api/player', require('./routes/api/player'));
app.use('/api/mail', require('./routes/api/mail'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
