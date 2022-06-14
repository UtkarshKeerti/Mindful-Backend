const mongoose = require('mongoose');

const UserMessageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  message: {
    type: String
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('userMessages', UserMessageSchema)
