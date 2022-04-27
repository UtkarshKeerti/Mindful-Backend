const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  age: { type: Number },
  // These questions will be asked during event registration, and will be event related only
  questions: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Questions'
  }]
},
  { timestamps: true }
);

module.exports = mongoose.model('Users', UserSchema)