const express = require('express');
const router = express.Router();
const Player = require('../../models/player');
const mongodb = require('../../mongodb');
const _ = require('lodash');

router.get('/:name', (req, res) => {
  const { name } = req.params;
  // const { pin } = req.query;
  mongodb(async (err) => {
    if (err) {
      return res.status(502).send(err.message);
    }
    const player = await Player.findOne({
      slug: name,
      // ...(pin ? { pin } : {}),
    }).catch((err) => {
      return res.status(404).send(err.message);
    });
    if (!player) {
      // if (pin) {
      //   return res.status(401).send('Usuário ou chave inválidos.');
      // }
      return res.status(404).send(`Jogador ${name} não existe!`);
      // return res.send();
    }
    res.send(player);
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  mongodb((err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    Player.create({ ...data, slug: _.kebabCase(data.name) }, (err, created) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      res.json(created);
    });
  });
});

module.exports = router;
