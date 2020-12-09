const { response } = require('express');
const express = require('express');
const responseController = require('../controllers/responseController');
const authController = require('../controllers/authController');

const router = express.Router();

//router.route('/').post(responseController.create);

router
  .route('/tossResponses')
  .get(
    authController.protect,
    responseController.limitToThree,
    responseController.aggregateTossResponses,
    responseController.getTossResponses
  );

router
  .route('/userResponses')
  .get(
    authController.protect,
    responseController.limitToThree,
    responseController.getUserResponses
  );

router
  .route('/:id')
  .get(responseController.getResponse)
  .patch(responseController.updateResponse)
  .delete(responseController.remove);

module.exports = router;
