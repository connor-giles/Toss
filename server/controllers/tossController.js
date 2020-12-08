const Toss = require('../models/TossModel');
const Response = require('../models/responseModel');
const catchAsync = require('../utils/catchAsync');
const APIFilters = require('../utils/apiFilters');
const AppError = require('../utils/appError');

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
  let tossID = req.params.id;
  let responseID = req.body._id;
  await Toss.findByIdAndUpdate(tossID, {
    $push: {
      userResponses: mongoose.Schema.Types.ObjectId(responseID),
    },
  }).then((toss) => {
    if (!toss) {
      return res.status(400).send({
        error: 'Name not found with an ID ' + tossID,
      });
    } else {
      console.log(responseID);
      res.json(toss);
    }
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
    { $match: { currentPhase: { $eq: 3 } } },
    {
      $group: {
        _id: null,
      },
    },
  ]);
});

// Used to make sure that a user only gets given one Toss a day to respond to
exports.limitToOneToss = catchAsync(async (req, res, next) => {
  const currentTosses = await Toss.find({ currentPhase: { $eq: 1 } });
  let response;
  currentTosses.map((toss) => {
    toss.userResponses.map(async (responseID) => {
      response = await Response.findById(responseID);
      if (response.userID === user._id) {
        return next(
          new AppError('User has already responded to a Toss today', 409)
        );
      }
    });
  });
  next();
});

exports.getTossed = catchAsync(async (req, res, next) => {});
