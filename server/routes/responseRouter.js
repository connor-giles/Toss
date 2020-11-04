const express = require('express');
const responseController = require('../controllers/responseController');

const router = express.Router();

router
  .route('/Response')
  .post(responseController.create)
  .get(responseController.listAll);

router
  .route('/:testId')
  .get(responseController.read)
  .delete(responseController.remove);

module.exports = router;
