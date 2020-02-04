const express = require('express');
const router = express.Router();
const Player = require('../../models/player');
const mongodb = require('../../mongodb');

router.get('/', (req, res) => {
  mongodb(async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    const levels = await Player.find({}).catch((err) => {
      return res.status(400).send(err.message);
    });
    res.send(levels);
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  mongodb((err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    Player.create(data, (err, created) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      res.json(created);
    });
  });
});

module.exports = router;
