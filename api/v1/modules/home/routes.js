const express = require('express');

// eslint-disable-next-line
const router = express.Router();

const controller = require('./controller');

router.get('/', controller.home);

module.exports = router;
