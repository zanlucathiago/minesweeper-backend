const mongoose = require('mongoose');
Level = require('../models/level');
const { Schema } = mongoose;

const recordSchema = Schema({
  player: {
    ref: 'Player',
    type: Schema.Types.ObjectId,
    required: true,
  },
  performance: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  level: {
    ref: 'Level',
    // type: Schema.Types.ObjectId,
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Record', recordSchema);
