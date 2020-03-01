const express = require('express');

const router = express.Router();
const _ = require('lodash');
const Player = require('../../models/player');
const mongodb = require('../../mongodb');

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
    res.status(404).send(`Jogador não existe!`);
    // return res.send();
  } else {
    res.send(player);
  }
  // console.log(player);
  // res.send({ ...player, file });
});

router.get('/download/:id', async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (player.filename) {
    return mongodb.read(player.filename, (err, rs) => {
      if (err) {
        return res.send();
      }
      // ;
      // res.contentType('image/jpeg');
      // res.send(data);
      return rs.pipe(res);

      // return res.json({ ...player._doc, file });
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
    // mongodb.upload(req, res)
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

router.put('/:id', async (req, res) => {
  const { body } = req;
  const { name, pin } = body;
  // const { filename } = file;
  const updated = await Player.findByIdAndUpdate(req.params.id, {
    name,
    // filename,
    pin,
    slug: _.kebabCase(name),
    lastUpdated: Date.now(),
  }).catch((err) => {
    return res.status(400).send(err.message);
  });
  res.json(updated);
});

module.exports = router;
