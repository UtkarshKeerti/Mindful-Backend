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
  title: {
    type: String
  },
  about: {
    type: String
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("members", MemberSchema)