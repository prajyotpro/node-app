const express = require('express');
const router = express.Router();



const HomeController = require("../controllers/home-controller");

// home route
router.get('/', HomeController.index);

module.exports = router;
