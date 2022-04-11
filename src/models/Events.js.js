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
  series: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Series'
  },
  eventRecording: { type: String },
  registeredUser: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Users'
  }],
  // Not Confirmed ---
  questions: [{
    type: mongoose.SchemaTypes.ObjectId
  }]
},
  { timestamps: true }
);

module.exports = mongoose.model('Events', EventSchema);