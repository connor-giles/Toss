const { response } = require('express');
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.listAll);

router.route('/register').post(userController.create);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.removeUser);

module.exports = router;
