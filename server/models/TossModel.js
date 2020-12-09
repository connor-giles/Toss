const { Mongoose } = require('mongoose');

mongoose = require('mongoose');

// Example Toss, with one filled response and on emepty response, after Phase 2 (i.e. after ratings have been given)
/* 
const model = {
  _id: { $oid: '5f99c419ad05fd8e97da3485' },
  date: { date: '2020-10-28T04:00:00.000Z' },
  prompt:
    'Should the supreme court nomination have been tabled until after an election?',
  userResponses: [
    {
      userID: 'colmepao',
      source:
        'https://stackoverflow.com/questions/9858393/limits-of-number-of-collections-in-databases',
      comment:
        'Lorem ipsum dolor sit amet, at quis inermis duo, simul rationibus per no, natum graece molestie ea vel. Etiam oportere cu mei, et sit purto nobis causae, cu ius prima hendrerit',
      tags: [
        { fresh: 8 },
        { controversial: '2' },
        { objectivity: '1' },
        { credible: '4' },
        { constructive: '0' },
        { emotive: '' },
      ],
    },
    { userID: '' },
  ],
};
*/

const tossSchema = new mongoose.Schema({
  // Date that Phase 1 of this Toss was started
  dateStarted: {
    type: Date,
    default: Date.now,
  },

  // One of four categories: Politics, Social, Environment, Science and Technology
  category: {
    science: {
      type: Boolean,
      default: 0,
    },
    politics: {
      type: Boolean,
      default: 0,
    },
    environment: {
      type: Boolean,
      default: 0,
    },
    society: {
      type: Boolean,
      default: 0,
    },
  },

  // Phase 0 = hasn't started
  // Phase 1-4 =  active
  // Phase 5 = completed (i.e. past/archived Toss)
  currentPhase: {
    type: Number,
    default: 0,
    max: [5, 'Exceeded max possible phase of 5'],
  },

  prompt: {
    type: String,
    required: [true, 'A toss must have a phase'],
  },

  // Array of references to Response Documents in the Response Collection
  // Stored by objectIDs (var: _id)
  userResponses: [
    {
      responseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response',
      },
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      MFTScore: {
        type: Number,
        default: 0,
      },
    },
  ],
});

tossSchema.pre('aggregate', function (next) {
  if (this.userResponses === undefined) {
    this.userResponses = [];
  }
  next();
});

module.exports = mongoose.model('Toss', tossSchema);
