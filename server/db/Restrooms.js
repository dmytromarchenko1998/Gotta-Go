const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoUri = 'mongodb://localhost/restrooms';
const db = mongoose.connect(mongoUri);

const restroomsSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String },
    coordinates: []
  },
  OpenHours: String,
  ClosedHours: String,
  OpenMins: String,
  ClosedMins: String,
  address: {type:String, unique:true},
  code: String,
});

restroomsSchema.index({ location: "2dsphere" });

const Restroom = mongoose.model('Restrooms', restroomsSchema);

module.exports = Restroom;