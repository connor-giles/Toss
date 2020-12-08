const { response } = require('express');
const express = require('express');
const responseController = require('../controllers/responseController');
const authController = require('../controllers/authController');

const router = express.Router();

//router.route('/').post(responseController.create);

router
  .route('/tossResponses')
  .get(authController.protect, responseController.getLimitedTossResponses);

router
  .route('/:id')
  .get(responseController.getResponse)
  .patch(responseController.updateResponse)
  .delete(responseController.remove);

module.exports = router;
