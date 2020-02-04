const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const mongodb = require('../../mongodb');

router.get('/', async (req, res, next) => {
  mongodb((err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    Record.find(req.query || {})
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
