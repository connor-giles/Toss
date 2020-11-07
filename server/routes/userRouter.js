const { response } = require('express');
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.listAll).post(userController.create);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.removeUser);

module.exports = router;

/// npm run client/src/App.js
