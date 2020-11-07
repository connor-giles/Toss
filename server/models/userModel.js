mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String, // Starting in MongoDB 4.0.9
  credentials: String,
  email: String,
  responses: [mongoose.Schema.Types.ObjectId],
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
