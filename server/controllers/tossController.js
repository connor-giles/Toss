const { test } = require('mocha');
const { Collection } = require('mongoose');
const { db } = require('../config/config.js');
const Toss = require('../models/tossModel');
const APIFilters = require('../utils/apiFilters');

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

// Retrieve all the docs
// APIFeatures
exports.getAllTosses = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message || 'An unknown error occurred',
    });
  }
};

/* Show the current FootballClub */
exports.getToss = async (req, res) => {
  let id = req.params.id;
  await Toss.findById(id)
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

// req body would contain Response 'object_id', which then gets pushed into Toss
exports.addResponse = async (req, res) => {
  let tossID = req.params.id;
  let responseID = req.body._id;
  await Toss.findByIdAndUpdate(tossID, {
    $push: {
      userResponses: mongoose.Schema.Types.ObjectId(responseID),
    },
  })
    .then((toss) => {
      if (!toss) {
        return res.status(400).send({
          error: 'Name not found with an ID ' + tossID,
        });
      } else {
        console.log(responseID);
        res.json(toss);
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message || 'An unknown error has occurred.',
      });
    });
};

/* .then((toss) => {
      if (!toss) {
        return res.status(400).send({
          error: 'Name not found with an ID ' + tossID,
        });
      } else {
        console.log(responseID);
        toss.{ $push: { userResponses: responseID } });
        res.json(toss);
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message || 'An unknown error has occurred.',
      });
    });
}
*/

exports.updateToss = async (req, res) => {
  let id = req.params.id;
  try {
    const Toss = await Toss.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        Toss,
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
exports.create = async (req, res) => {
  //
  const info = req.body;
  //
  if (!info) {
    return res.status(200).send({
      error: 'info not found in request',
    });
  }
  await new Toss(info)
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

/* Delete a Toss */
exports.removeToss = async (req, res) => {
  let id = req.params.testId;

  await Toss.deleteOne({ _id: id }, (err) => {
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
