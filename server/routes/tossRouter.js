const { response } = require('express');
const express = require('express');
const tossController = require('../controllers/tossController');

const router = express.Router();

router.route('/').get(tossController.listAll).post(tossController.create);

router
  .route('/:id')
  .get(tossController.getToss)
  .patch(tossController.updateToss)
  .delete(tossController.removeToss);

module.exports = router;

/// npm run client/src/App.js
