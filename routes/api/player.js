const express = require('express');
const router = express.Router();
const Player = require('../../models/player');

router.get('/', async (req, res) => {
  const levels = await Player.find({}).catch((err) => {
    res.status(400).send(err.message);
  });
  res.send(levels);
});

router.post('/', (req, res) => {
  const data = req.body;
  Player.create(data, (err, created) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(created);
  });
});

module.exports = router;
