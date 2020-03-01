const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  filename: {
    type: String,
  },
});

module.exports = mongoose.model('Player', playerSchema);
