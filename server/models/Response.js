const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  respondent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;