const express = require('express');
const router = express.Router();
const Player = require('../../models/player');

router.post('/', (req, res) => {
  const data = req.body;
  Player.findOne(data, (err, found) => {
    if (err) {
      res.send(err.message);
    }
    res.json(found);
  });
});

module.exports = router;
