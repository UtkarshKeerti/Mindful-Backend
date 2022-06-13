const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: { type: String },
  events: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'events'
  }],
  speakers: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'speakers'
  }],
  description: {
    type: String,
  }
});

module.exports = mongoose.model('conversations', conversationSchema);