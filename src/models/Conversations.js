const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  events: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Events'
  }],
  speakers: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Speakers'
  }],
  about: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Coversations', conversationSchema);