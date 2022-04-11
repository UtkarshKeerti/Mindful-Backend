const mongoose = require('mongoose');

const SpeakerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'http://cdn.onlinewebfonts.com/svg/img_568657.png',
  },
  about: {
    type: String
  },
  series: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Series'
  }]
},
  { timestamps: true }
);

module.exports = mongoose.model("Speakers", SpeakerSchema)