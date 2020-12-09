mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: [true, 'username already taken'],
    required: [true, 'A user must have a username '],
  },

  role: {
    type: String,
    enum: ['user', 'moderator'],
    default: 'user',
  },

  credentials: {
    type: String,
    trim: true,
    required: [true, 'A user must have login credentials '],
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
      message: 'Passwords are not the same!',
    },
  },

  email: {
    type: String,
    trim: true,
    required: [true, 'A user must have an email '],
    lowercase: true,
    validate: [validator.isEmail],
    unique: [true, 'email already used'],
  },

  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Response',
    },
  ],

  MFT: {
    totalScore: { type: Number, default: 0 },
    care: { type: Number, default: 0 },
    fairness: { type: Number, default: 0 },
    ingroupLoyalty: { type: Number, default: 0 },
    authorityRespect: { type: Number, default: 0 },
    puritySanctity: { type: Number, default: 0 },
  },

  credentialsChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // Only runs if the password is created or modified
  if (!this.isModified('credentials')) return next();

  // Hash the password with cost of 12
  this.credentials = await bcrypt.hash(this.credentials, 12);

  // Delete the password confirm field.
  this.credentialsConfirm = undefined;
  next();
});

userSchema.methods.correctCredentials = async function (
  candidateCredentials,
  userCredentials
) {
  return await bcrypt.compare(candidateCredentials, userCredentials);
};

userSchema.methods.changedCredentialsAfter = function (JWTTimestamp) {
  if (this.credentialsChangedAt) {
    const changedTimestamp = parseInt(
      this.credentialsChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
