const express = require('express');
const router = express.Router();
router.use('/', require('./index/index'));
module.exports = router;