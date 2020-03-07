const express = require('express');
const useragent = require('useragent');

useragent(true);
const router = express.Router();
// const _ = require('lodash');
// const moment = require('moment');
const Record = require('../../models/record');
// const mongodb = require('../../mongodb');

const filterResults = (populated) => {
  const filtered = [];

  populated.forEach((item) => {
    const { performance } = item;
    const [firstItem] = filtered;

    if (!firstItem || performance <= firstItem.performance) {
      filtered.unshift(item);
    }
  });
  return filtered;
};

router.delete('/', async (req, res) => {
  // mongodb(async (err) => {
  //   if (err) {
  //     return res.status(400).send(err.message);
  //   }
  await Record.deleteMany({}).catch((err) => {
    return res.status(400).send(err.message);
  });
  // });
  res.send('Apagados!');
});

router.get('/', async (req, res) => {
  // const { level, player, _id } = req.query;
  const { level, _id } = req.query;

  const global = await Record.find({
    level,
    // ...(player !== 'true' ? { player: _id } : {}),
  })
    .sort('-date')
    .populate('player')
    .exec()
    .catch((err) => res.status(400).send(err.message));

  const personal = await Record.find({
    level,
    // ...(player !== 'true' ? { player: _id } : {}),
    player: _id,
  })
    .sort('-date')
    .populate('player')
    .exec()
    .catch((err) => res.status(400).send(err.message));

  res.send([filterResults(global), filterResults(personal)]);
});

router.post('/', async (req, res) => {
  const record = req.body;
  const agent = useragent.parse(req.headers['user-agent']);

  const created = await Record.create(record).catch((err) =>
    res.status(400).send(err.message),
  );

  res.json(created);
});

module.exports = router;
