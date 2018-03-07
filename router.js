var express = require('express');
var router = express.Router();

router.use('/users', require('./routes/user/index'));

module.exports = router;
