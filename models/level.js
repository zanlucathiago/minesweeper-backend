const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mines: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Level', levelSchema);
