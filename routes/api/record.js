const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const mongodb = require('../../mongodb');
const _ = require('lodash');
const moment = require('moment');

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
  const { level, player, _id } = req.query;
  // mongodb(async (err) => {
  //   if (err) {
  //     return res.status(400).send(err.message);
  //   }
  const populated = await Record.find({
    level,
    // ...(date !== 'true'
    //   ? { date: { $gte: moment().subtract(1, 'days') } }
    //   : {}),
    ...(player !== 'true' ? { player: _id } : {}),
  })
    // .sort({ performance: 1 })
    .sort('-date')
    // .limit(12)
    .populate('player')
    .exec()
    .catch((err) => {
      return res.status(400).send(err.message);
    });
  const filtered = [];
  // let currentPerformance = null;
  populated.forEach((item, index) => {
    // console.log()
    const { performance } = item;
    const [firstItem] = filtered;
    if (!firstItem || performance <= firstItem.performance) {
      filtered.unshift(item);
      // currentPerformance = performance;
    }
  });
  res.send(filtered);
  // });
});

router.post('/', async (req, res) => {
  const record = req.body;
  // mongodb(async (err) => {
  //   if (err) {
  //     return res.status(400).send(err.message);
  //   }
  const created = await Record.create(record).catch((err) => {
    return res.status(400).send(err.message);
  });
  res.json(created);
  // });
});

module.exports = router;
