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
  }]
});

module.exports = mongoose.model('Coversations', conversationSchema);