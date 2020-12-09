const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { Mongoose } = require('mongoose');

// Retrieve all the docs
exports.listAll = catchAsync(async (req, res) => {
  const users = await User.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

/* Show the current user */
exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  //console.log(user);

  if (!user) {
    return next(new AppError('Username:' + id + ' not found.', 404));
  } else {
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
});

exports.updateUser = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  const user = await User.findOneAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError('Username:' + id + ' not found.', 404));
  } else {
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
});

// Updates quiz for a user.
exports.updateQuiz = catchAsync(async (req, res, next) => {
  let totalScore =
    req.body.care +
    req.body.puritySanctity +
    req.body.authorityRespect +
    req.body.ingroupLoyalty +
    req.body.fairness;
  const user = await User.findById({ _id: req.user._id }).update({
    $set: {
      'MFT.care': req.body.care,
      'MFT.fairness': req.body.fairness,
      'MFT.ingroupLoyalty': req.body.ingroupLoyalty,
      'MFT.authorityRespect': req.body.authorityRespect,
      'MFT.puritySanctity': req.body.puritySanctity,
      'MFT.totalScore': totalScore,
    },
  });

  if (!user) {
    return next(new AppError('Username:' + id + ' not found.', 404));
  } else {
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
});

/* Create a entry in db */
exports.create = async (req, res) => {
  //
  const info = req.body;
  //
  if (!info) {
    return res.status(400).send({
      error: 'info not found in request',
    });
  }
  await new User(info)
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    });
};

/* Delete a user */
exports.removeUser = async (req, res) => {
  let id = req.params.testId;

  await User.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(200).send({
        error: err.message || 'An unknown error occurred',
      });
    }
    res.send({
      error: id + ' has been deleted successfully',
    });
  });
};

// // Sorts Users (documents) within this Toss (assumed to be present in req as 'tossID'), into three groupings, based on their MFT scores
// exports.phase2Aggregate = catchAsync(async (req, res, next) => {
//   let toss = await Response.aggregate([
//     {
//       $match: { assocToss: req.body.tossID },
//       // $group: {
//       //   _id: null,
//       //   std: { $stdDevSamp: '$userResponses' },
//       // },
//     },
//   ]);
//   if (!toss) {
//     return new AppError('No toss found with that id', 400);
//   }
//   return res.status(200).json({
//     status: 'success',
//     data: toss,
//   });
// });

// exports.updateMany = catchAsync(async (req, res, next) => {
//   const user = await User.updateMany(
//     {},
//     {
//       $set: { 'MFT.totalScore': 0 },
//     }
//   );
//   return res.status(200).json({
//     status: 'success',
//     data: user,
// }
