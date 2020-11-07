mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userID: String,
  source: String,
  comment: String,
  tags: {
    fresh: { type: Number, default: 0 },
    controversial: { type: Number, default: 0 },
    objectivity: { type: Number, default: 0 },
    credible: { type: Number, default: 0 },
    constructive: { type: Number, default: 0 },
    emotive: { type: Number, default: 0 },
  },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;

// test driven model
//
