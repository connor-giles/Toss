mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'A user must have a username '],
  },

  credentials: {
    type: String,
    trim: true,
    required: [true, 'A user must have login credentials '],
    // TODO: implement fields such that, with the next line, credentials is never sent to the client
    select: false,
  },

  email: {
    type: String,
    trim: true,
    required: [true, 'A user must have an email '],
  },

  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Response',
    },
  ],

  MST: {
    A: { type: Number, default: 0 },
    B: { type: Number, default: 0 },
    C: { type: Number, default: 0 },
    D: { type: Number, default: 0 },
    E: { type: Number, default: 0 },
    F: { type: Number, default: 0 },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
