const { response } = require('express');
const express = require('express');
const responseController = require('../controllers/responseController');

const router = express.Router();

router
  .route('/')
  .get(responseController.listAll)
  .post(responseController.create);

router
  .route('/:id')
  .get(responseController.getResponse)
  .patch(responseController.updateResponse)
  .delete(responseController.remove);

module.exports = router;
