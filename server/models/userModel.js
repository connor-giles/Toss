mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: [true, 'username already taken'],
    required: [true, 'A user must have a username '],
  },

  credentials: {
    type: String,
    trim: true,
    required: [true, 'A user must have login credentials '],
    // TODO: implement fields such that, with the next line, credentials is never sent to the client
    select: false,
    minlength: 8,
  },

  credentialsConfirm: {
    type: String,
    trim: true,
    required: [true, 'Please confirm your password '],
    select: false,
    validate: {
      // This only works on .save()
      validator: function (el) {
        return el === this.credentials;
      },
    },
  },

  email: {
    type: String,
    trim: true,
    required: [true, 'A user must have an email '],
    lowercase: true,
    validate: [validator.isEmail],
  },

  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Response',
    },
  ],

  MST: {
    care: { type: Number, default: 0 },
    fairness: { type: Number, default: 0 },
    ingroupLoyalty: { type: Number, default: 0 },
    authorityRespect: { type: Number, default: 0 },
    puritySanctity: { type: Number, default: 0 },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
