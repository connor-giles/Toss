const Toss = require('../models/tossModel');
const Response = require('../models/responseModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const APIFilters = require('../utils/apiFilters');
const AppError = require('../utils/appError');
const { query } = require('express');

exports.aliasPhase0Tosses = (req, res, next) => {
  req.query.limit = '4';
  req.query.currentPhase = '0';
  next();
};

exports.aliasPhase1Tosses = (req, res, next) => {
  req.query.limit = '4';
  req.query.currentPhase = '1';
  next();
};

exports.aliasPhase2Tosses = (req, res, next) => {
  req.query.limit = '4';
  req.query.currentPhase = '2';
  next();
};

/*
exports.queryTosses = catchAsync(async(query, queryString) => { = 
   const features = new APIFilters(Toss.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tosses = await features.query;
})
*/

// Retrieve all the docs
// APIFeatures
exports.getAllTosses = catchAsync(async (req, res, next) => {
  // Execute query
  const features = new APIFilters(Toss.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tosses = await features.query;

  // Send response
  res.status(200).json({
    status: 'success',
    results: tosses.length,
    data: { tosses },
  });
});

/* Show the current FootballClub */
exports.getToss = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  const toss = await Toss.findById(id);
  if (!info) {
    return next(new AppError('Toss not found with an ID: ' + id, 404));
  }
  res.status(200).json({
    status: 'success',
    data: info,
  });
});

// req body would contain Response 'object_id', which then gets pushed into Toss
exports.addResponse = catchAsync(async (req, res, next) => {
  let toss_id = req.param.id;

  await Toss.findByIdAndUpdate(toss_id, {
    $push: {
      userResponses: {
        responseID: mongoose.Types.ObjectId(req.newResponse._id),
        userID: mongoose.Types.ObjectId(req.user._id),
      },
    },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      responses: mongoose.Types.ObjectId(req.newResponse._id),
    },
  });

  res.status(201).json({
    status: 'success',
    data: req.newResponse,
  });
});

exports.updateToss = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  const Toss = await Toss.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!Toss) {
    return next(new AppError('Toss not found with an ID: ' + id, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      Toss,
    },
  });
});

/* Create a entry in db */
exports.create = catchAsync(async (req, res, next) => {
  const newToss = await Toss.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      toss: newToss,
    },
  });
});

/* Delete a Toss */
exports.removeToss = catchAsync(async (req, res, next) => {
  let id = req.params.testId;
  const toss = await Toss.deleteOne({ _id: id });
  if (!toss) {
    return next(new AppError('Toss not found with an ID: ' + id, 404));
  }
  res.status(201).json({
    status: 'success',
    message: id + ' has been deleted successfully',
  });
});

exports.getTossStats = catchAsync(async (req, res, next) => {
  const stats = await Toss.aggregate([
    { $match: { currentPhase: { $eq: 1 } } },
    {
      $group: {
        _id: null,
      },
    },
  ]);
}); // MIDDLEWARE

/* MIDDLEWARE
Used to make sure that a user only gets given one Toss a day to respond to. 
   Adds a property to the req object called 'todaysTosses', which contains
   all (currentPhase = 1) Tosses sorted in ascending order of the number of 
   responses each one has so far.
*/ exports.getTossToParticipateIn = catchAsync(
  async (req, res, next) => {
    // holds an aggregation of Tosses in currentPhase = 1, sorted by the number of responses so far
    const todaysTosses = await Toss.aggregate([
      {
        $project: {
          dateStarted: 1,
          category: 1,
          currentPhase: 1,
          prompt: 1,
          userResponses: 1,
          length: { $size: '$userResponses' },
        },
      },
      {
        $match: { currentPhase: { $eq: 1 } },
      },
      {
        $sort: { length: 1 },
      },
    ]);
    req.tossToParticipateIn = todaysTosses[0];
    next();
  }
);

exports.limitToOneToss = catchAsync(async (req, res, next) => {
  req.query.currentPhase = 1;

  const features = new APIFilters(Toss.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const todaysTosses = await features.query;

  const checkIfTossed = await features.query.findOne({
    userResponses: { $elemMatch: { userID: { $eq: req.user._id } } },
  });

  console.log(checkIfTossed);

  if (checkIfTossed)
    return next(
      new AppError('User has already responded to a Toss today', 409)
    );

  req.todaysTosses = todaysTosses;
  next();
});

exports.getTossed = catchAsync(async (req, res, next) => {
  if (!req.tossToParticipateIn)
    return next(new AppError('Could not find a Toss to participate in!', 500));

  const toss = await Toss.findById(req.tossToParticipateIn._id);

  req.tossToParticipateIn = toss;

  res.status(201).json({
    status: 'success',
    message: "Have fun getting Toss'd!",
    data: toss,
  });
});
