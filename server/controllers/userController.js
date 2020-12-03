const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

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

/* Show the current FootballClub */
exports.getUser = catchAsync(async (req, res) => {
  let userID = req.params.id;
  const user = await User.findById(userID);
  if (!user) {
    return next(new AppError('Username:' + id + ' not found.', 404));
  } else {
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
});

exports.updateUser = catchAsync(async (req, res) => {
  let id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
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

/* Delete a FootballClub */
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
