const express = require('express');
const router = express.Router();
const Player = require('../../models/player');
const mongodb = require('../../mongodb');

router.post('/', (req, res) => {
  const data = req.body;
  mongodb(async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    Player.findOne(data, (err, found) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      if (!found) {
        return res.status(401).send('Usuário ou senha inválidos.');
      }
      res.json(found);
    });
  });
});

module.exports = router;
