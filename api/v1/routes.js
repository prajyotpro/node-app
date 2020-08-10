const express = require('express');

// eslint-disable-next-line
const router = express.Router();

const home = require('./modules/home/routes');

router.use('/home', home);

module.exports = router;
