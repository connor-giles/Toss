const { Collection } = require('mongoose');
const { db } = require('../config/config.js');
const testModel = require('../models/testModel.js')

exports.hello = function(req, res) {
    res.send('Hello, World!')
};

// Retrieve all the docs
exports.listAll = async (req, res) => {
    await testModel.find({}, (err, data) => {
        if (err)
            return res.status(200).send({
            message: err.message || "An unknown error occurred",
            });
        res.json(data);
    });
};

/* Show the current FootballClub */
exports.read = async (req, res) => {
    let id = req.params.testId;
    await testModel.findById(id)
      .then((info) => {
        if (!info) {
          return res.status(200).send({
            error: "Name not found with an Id " + id,
          });
        }
        res.json(info);
      })
      .catch((err) => {
        res.status(200).send({
          error: err.message || "An unknown error has occurred.",
        });
      });
  };

  /* Create a entry in db */
exports.create = async (req, res) => {
    const info = req.body;
    if (!info) {
      return res.status(200).send({
        error: "info not found",
      });
    }
    await new testModel(info).save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  };