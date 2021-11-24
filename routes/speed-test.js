const express = require('express');

const router = express.Router();

const speedTestController = require('../controllers/speed-test');

router.get('/', speedTestController.download);

module.exports = router;
