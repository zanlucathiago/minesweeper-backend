const express = require('express');
const router = express.Router();
const Level = require('../../models/level');
const mongodb = require('../../mongodb');

router.get('/', (req, res) => {
  mongodb(async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    const levels = await Level.find({}).catch((err) => {
      return res.status(400).send(err.message);
    });
    res.send(levels);
  });
});

module.exports = router;
