var express = require('express');
var router = express.Router();

router.use('/', require('./routes/index/index'));

module.exports = router;
