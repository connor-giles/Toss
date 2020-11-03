const testController = require('../controllers/testController.js'),
    express = require('express'), 
    router = express.Router()

router.get('/', testController.listAll);
router.get('/:testId', testController.read);
router.post('/', testController.create);

module.exports = router;