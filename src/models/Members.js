const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'http://cdn.onlinewebfonts.com/svg/img_568657.png',
  },
  designation: {
    type: String
  },
  about: {
    type: String
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("Team", MemberSchema)