const mongoose = require('mongoose');

var mugSchema = new mongoose.Schema({
  type: { type: String, default: 'Manchego' },
  origin: { type: String, default: 'Sheep' },
  country: { type: String, default: 'Spain' },
  personalCount: { type: Number },
  collectorId: { type: String }
});

module.exports = mongoose.model('Cheese', mugSchema);
