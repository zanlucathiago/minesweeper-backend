const express = require('express');
const router = express.Router();
const Level = require('../../models/level');
const mongodb = require('../../mongodb');

router.get('/', (req, res) => {
  mongodb(async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    const levels = await Level.find({}).catch((err) => {
      return res.status(400).send(err.message);
    });
    res.send(levels);
  });
});

// router.post('/', (req, res) => {
//   const level = req.body;
//   mongodb((err) => {
//     if (err) {
//       return res.status(400).send(err.message);
//     }
//     Level.create(level, (err, created) => {
//       if (err) {
//         return res.status(400).send(err.message);
//       }
//       res.json(created);
//     });
//   });
// });

module.exports = router;
