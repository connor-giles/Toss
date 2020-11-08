const testController = require('../controllers/testController.js'),
  express = require('express'),
  router = express.Router();

router.get('/', testController.listAll);

//database manipulations
router.get('/:testId', testController.read);
router.post('/', testController.create);
router.delete('/:testId', testController.remove);

module.exports = router;
