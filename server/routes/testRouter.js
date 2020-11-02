const testController = require('../controllers/testController.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(testController.listAll);

module.exports = router;