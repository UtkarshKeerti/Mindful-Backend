const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  events: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'events'
  }],
  speakers: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'speakers'
  }],
  about: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('conversations', conversationSchema);