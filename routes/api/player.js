const express = require('express');
const router = express.Router();
const Player = require('../../models/player');
const mongodb = require('../../mongodb');
const _ = require('lodash');

router.get('/', async (req, res) => {
  // const { name } = req.query;
  // const { pin } = req.query;
  // mongodb(async (err) => {
  //   if (err) {
  //     return res.status(502).send(err.message);
  //   }
  const player = await Player.findOne(req.query).catch((err) => {
    return res.status(404).send(err.message);
  });
  if (!player) {
    // if (pin) {
    //   return res.status(401).send('Usuário ou chave inválidos.');
    // }
    return res.status(404).send(`Jogador não existe!`);
    // return res.send();
  }
  // console.log(player);
  res.send(player);
  // });
});

router.post('/', async (req, res) => {
  const data = req.body;
  // mongodb(async (err) => {
  //   if (err) {
  //     return res.status(400).send(err.message);
  //   }
  const created = await Player.create({
    ...data,
    slug: _.kebabCase(data.name),
  }).catch((err) => {
    return res.status(400).send(err.message);
  });
  res.json(created);
  // });
});

module.exports = router;
