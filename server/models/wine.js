const mongoose = require('mongoose');

var wineSchema = new mongoose.Schema({
  type: { type: String },
  grapes: { type: String },
  country: { type: String, default: 'France' },
  collectorId: { type: String }
});


module.exports = mongoose.model('Wine', wineSchema);
