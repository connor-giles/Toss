var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username: "Connor Giles"},
    {id: 2, username: "Ashish Goolla"}
  ])
});

module.exports = router;
