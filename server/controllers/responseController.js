const { test } = require('mocha');
const { Collection } = require('mongoose');
const { db } = require('../config/config.js');
const Response = require('../models/responseModel');

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
exports.create = async (req, res) => {
  //
  const info = req.body;
  //
  if (!info) {
    return res.status(200).send({
      error: 'info not found in request',
    });
  }
  await new Response(info)
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