const { test } = require('mocha');
const { Collection } = require('mongoose');
const { db } = require('../config/config.js');
const Response = require('../models/responseModel');
const AppError = require('../utils/appError.js');
const APIFilters = require('../utils/apiFilters');
const catchAsync = require('../utils/catchAsync');

// Retrieve all the docs
exports.listAll = async (req, res) => {
  await Response.find({}, (err, data) => {
    if (err)
      return res.status(400).send({
        message: err.message || 'An unknown error occurred',
      });
    res.json(data);
  });
};

/* Show the current FootballClub */
exports.getResponse = async (req, res) => {
  let id = req.params.id;
  await Response.findById(id)
    .then((info) => {
      if (!info) {
        return res.status(200).send({
          error: 'Name not found with an ID ' + id,
        });
      }
      res.json(info);
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message || 'An unknown error has occurred.',
      });
    });
};

// Gets all the responses for a Toss whose ObjectId is sent in the request as 'tossID'
exports.getLimitedTossResponses = catchAsync(async (req, res, next) => {
  // change this depending on how many responses you want. Remove it if you'd like all responses for this toss
  req.query.limit = '3';

  // Execute query
  const features = new APIFilters(
    Response.find({ assocToss: mongoose.Types.ObjectId(req.body.tossID) }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const responses = await features.query;

  res.status(200).json({
    status: 'success',
    results: responses.length,
    data: { responses },
  });
});

exports.updateResponse = async (req, res) => {
  let id = req.params.id;
  try {
    const response = await Response.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        response,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

/* Create a entry in db */
exports.create = catchAsync(async (req, res, next) => {
  //
  const info = req.body;
  info.userID = req.user._id;
  info.assocToss = mongoose.Types.ObjectId(req.tossToParticipateIn._id);
  //
  if (!info) {
    return new AppError(
      'Could not create a response from the request data',
      406
    );
  }
  const response = await new Response(info).save();
  req.newResponse = response;
  next();
});

/* Delete a FootballClub */
exports.remove = async (req, res) => {
  let id = req.params.testId;

  await Response.deleteOne({ _id: id }, (err) => {
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
