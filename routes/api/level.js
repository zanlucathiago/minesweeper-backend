const express = require('express');
const router = express.Router();
const Level = require('../../models/level');

router.get('/', async (req, res) => {
  const levels = await Level.find({}).catch((err) => {
    res.status(400).send(err.message);
  });
  res.send(levels);
});

router.post('/', (req, res) => {
  const level = req.body;
  Level.create(level, (err, created) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(created);
  });
});

module.exports = router;
