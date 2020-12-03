const { response } = require('express');
const express = require('express');
const tossController = require('../controllers/tossController');
const authController = require('../controllers/authController');

const router = express.Router();

// Router for accessing the entire Collection of Toss's
// would be used for features on the homepage or searching archived Toss's
// Also used for initializing a new Toss
router.route('/').get(tossController.getAllTosses).post(tossController.create);

/* 
This router has pre-filters which send only the first three Toss's with
 a currentPhase of 0, meaning hthat that they have not yet started.
*/
router
  .route('/3Phase0Tosses')
  .get(tossController.aliasPhase0Tosses, tossController.getAllTosses);

/* 
  This router has pre-filters which send only the first three Toss's with
 a currentPhase of 1.
*/
router
  .route('/3Phase1Tosses')
  .get(tossController.aliasPhase1Tosses, tossController.getAllTosses);

router
  .route('/3Phase2Tosses')
  .get(tossController.aliasPhase2Tosses, tossController.getAllTosses);

// router for getting/updating all details of an individual Toss
router
  .route('/:id')
  .get(tossController.getToss)
  .patch(tossController.updateToss)
  .delete(tossController.removeToss);

// router for Toss Phases 1 and 2 (adding and manipulating responses within a Toss)
router
  .route('/:id/newResponse')
  //.get(tossController.getResponse)
  .patch(authController.protect, tossController.addResponse);

router
  .route('/getTossed')
  .patch(
    authController.protect,
    tossController.limitToOneToss,
    tossController.getTossed
  );

module.exports = router;
