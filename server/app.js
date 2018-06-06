const express = require('express');
const path = require('path');
const Restroom = require('./db/Restrooms.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '/../dist')));

app.get('/api/:lat/:lon/:rad', (req, res) => {
  console.log(req.url)
  let radiusInMeters = req.params.rad * 1609.344;
  Restroom.find({
    location: {
      $near: {
        $maxDistance: radiusInMeters,
        $geometry: {
          type: "Point",
          coordinates: [req.params.lon, req.params.lat]
        }
      }
    }
  }, (err, data) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.post('/api/add', (req, res) => {
  let restroom = new Restroom(req.body)
  restroom.save((err, data) => {
    if (err) {
      res.send("already added")
    } else {
      res.sendStatus(202);
    }
  })
})

module.exports = app;