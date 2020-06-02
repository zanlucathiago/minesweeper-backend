const express = require('express');
const useragent = require('useragent');

useragent(true);
const router = express.Router();
const Record = require('../../models/record');

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
  await Record.deleteMany({}).catch((err) => {
    return res.status(400).send(err.message);
  });

  res.send('Apagados!');
});

router.get('/', async (req, res) => {
  const { level, _id } = req.query;

  const global = await Record.find({
    level,
  })
    .sort('-date')
    .populate('player')
    .exec()
    .catch((err) => res.status(400).send(err.message));

  const personal = await Record.find({
    level,
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

  for (r of Array.isArray(record) ? record : [record]) {
    await Record.create(r).catch((err) => res.status(400).send(err.message));
  }

  res.status(200).send('Recorde salvo.');
});

module.exports = router;
