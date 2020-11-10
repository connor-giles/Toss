const { test } = require('mocha');
const { Collection } = require('mongoose');
const { db } = require('../config/config.js');
const User = require('../models/userModel');

// Retrieve all the docs
exports.listAll = async (req, res) => {
  await User.find({}, (err, data) => {
    if (err)
      return res.status(400).send({
        message: err.message || 'An unknown error occurred',
      });
    res.json(data);
  });
};

/* Show the current FootballClub */
exports.getUser = async (req, res) => {
  let user = req.params.username;
  await User.find({ username: user })
    .then((info) => {
      if (!info) {
        return res.status(400).send({
          error: 'Username:' + id + ' not found.',
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

exports.updateUser = async (req, res) => {
  let id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
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
