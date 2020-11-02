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