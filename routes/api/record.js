const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const mongodb = require('../../mongodb');
const _ = require('lodash');
const moment = require('moment');

router.delete('/', async (req, res) => {
  mongodb(async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    await Record.deleteMany({}).catch((err) => {
      return res.status(400).send(err.message);
    });
  });
  res.send('Apagados!');
});

router.get('/', (req, res) => {
  const { level, player, date, _id } = req.query;
  mongodb((err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    Record.find({
      level,
      ...(date !== 'true'
        ? { date: { $gte: moment().subtract(1, 'days') } }
        : {}),
      ...(player !== 'true' ? { player: _id } : {}),
    })
      .sort({ performance: 1 })
      .limit(12)
      .populate('player')
      .exec((err, populated) => {
        if (err) {
          return res.status(400).send(err.message);
        }
        res.send(populated);
      });
  });
});

router.post('/', (req, res) => {
  const record = req.body;
  mongodb((err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    Record.create(record, (err, created) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      res.json(created);
    });
  });
});

module.exports = router;
