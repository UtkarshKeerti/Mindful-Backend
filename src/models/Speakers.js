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
  // // Add conversation details for each speakear, if analysis is required.
  // conversations: [{
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'conversations'
  // }]
},
  { timestamps: true }
);

module.exports = mongoose.model("speakers", SpeakerSchema)