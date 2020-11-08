const { response } = require('express');
const express = require('express');
const tossController = require('../controllers/tossController');

const router = express.Router();

// Router for accessing the entire Collection of Toss's
// would be used for features on the homepage or searching archived Toss's
// Also used for initializing a new Toss
router.route('/').get(tossController.listAll).post(tossController.create);

// router for getting/updating all details of a Toss
router
  .route('/:id')
  .get(tossController.getToss)
  .patch(tossController.updateToss)
  .delete(tossController.removeToss);

// router for Toss Phases 1 and 2 (adding and manipulating responses within a Toss)
router
  .route('/:id/newResponse')
  //.get(tossController.getResponse)
  .patch(tossController.addResponse);

module.exports = router;
