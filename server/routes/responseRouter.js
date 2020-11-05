const express = require('express');
const responseController = require('../controllers/responseController');

const router = express.Router();

router
  .route('/')
  .get(responseController.listAll)
  .post(responseController.create);

router
  .route('/:testId')
  .get(responseController.read)
  .delete(responseController.remove);

module.exports = router;
