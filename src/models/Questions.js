const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  question: { type: String },
  answer: { type: String }
},
  { timestamps: true }
);

module.exports = mongoose.model('Questions', QuestionSchema)