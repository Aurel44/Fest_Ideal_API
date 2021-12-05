const mongoose = require("mongoose");

const BandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  music_style: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.model('bands',BandSchema);