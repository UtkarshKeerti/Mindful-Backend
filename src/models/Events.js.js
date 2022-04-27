const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: { type: String },
  description: { type: String },
  date: { type: Date },
  time: { type: String },
  coversation: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Coversations'
  },
  eventRecording: { type: String },
  //--- ONly for data collection purpose
  // registeredUser: [{
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'Users'
  // }],
  // questions: [{
  //   type: mongoose.SchemaTypes.ObjectId
  // }]
},
  { timestamps: true }
);

module.exports = mongoose.model('Events', EventSchema);