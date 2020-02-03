const express = require('express');
const router = express.Router();
const Record = require('../../models/record');

router.get('/', async (req, res) => {
  // console.log(req);
  Record.find(req.query || {})
    .populate('player')
    // .populate('level')
    .exec((err, populated) => {
      if (err) {
        res.status(400).send(err.message);
      }
      res.send(populated);
    });
  // .catch((err) => {
  //   res.status(400).send(err.message);
  // });
  // res.send(data);
});

router.post('/', (req, res) => {
  const record = req.body;
  Record.create(record, (err, created) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(created);
  });
});

module.exports = router;
