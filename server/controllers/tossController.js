const { test } = require('mocha');
const { Collection } = require('mongoose');
const { db } = require('../config/config.js');
const Toss = require('../models/tossModel');

// Retrieve all the docs
exports.listAll = async (req, res) => {
  await Toss.find({}, (err, data) => {
    if (err)
      return res.status(400).send({
        message: err.message || 'An unknown error occurred',
      });
    res.json(data);
  });
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
