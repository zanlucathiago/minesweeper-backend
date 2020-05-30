const express = require('express');

const router = express.Router();
const _ = require('lodash');
const Player = require('../../models/player');
const mongodb = require('../../mongodb');

router.get('/', async (req, res) => {
  const player = await Player.findOne(req.query).catch((err) => {
    return res.status(404).send(err.message);
  });

  if (!player) {
    res.status(404).send(`Jogador não existe!`);
  } else {
    res.send(player);
  }
});

router.get('/download/:id', async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (player.filename) {
    return mongodb.read(player.filename, (err, rs) => {
      if (err) {
        return res.send();
      }

      return rs.pipe(res);
    });
  }

  return res.send();
});

router.post(
  '/upload/:id',
  async (req, res, next) => {
    const { filename } = await Player.findById(req.params.id);
    if (filename) {
      await mongodb.remove(filename);
    }

    next();
  },
  mongodb.upload,
  async (req, res) => {
    const { filename } = req.file;
    const updated = await Player.findByIdAndUpdate(req.params.id, { filename });
    res.send(updated);
  },
);

router.post('/', async (req, res) => {
  const data = req.body;

  const created = await Player.create({
    ...data,
    slug: _.kebabCase(data.name),
  }).catch((err) => {
    return res.status(400).send(err.message);
  });

  res.json(created);
});

router.put('/:id', async (req, res) => {
  const { body } = req;
  const { name, pin } = body;

  const updated = await Player.findByIdAndUpdate(req.params.id, {
    name,
    pin,
    slug: _.kebabCase(name),
    lastUpdated: Date.now(),
  }).catch((err) => {
    return res.status(400).send(err.message);
  });

  res.json(updated);
});

module.exports = router;
