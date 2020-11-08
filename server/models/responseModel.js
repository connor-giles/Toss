mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      trim: true,
      required: [
        true,
        'A response must have an associated user',
      ],
    },

    source: {
      type: String,
      trim: true,
      required: [
        true,
        'A response must have a referenced source ',
      ],
    },

    comment: {
      type: String,
      trim: true,
    },

    tags: {
      fresh: {
        type: Number,
        default: 0,
      },
      controversial: {
        type: Number,
        default: 0,
      },
      objectivity: {
        type: Number,
        default: 0,
      },
      credible: {
        type: Number,
        default: 0,
      },
      constructive: {
        type: Number,
        default: 0,
      },
      emotive: {
        type: Number,
        default: 0,
      },
    },

    submittedAt: {
      type: Date,
      default: Date.now(),
    },
  }
);

const Response = mongoose.model(
  'Response',
  responseSchema
);

module.exports = Response;
