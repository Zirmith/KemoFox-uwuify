const express = require('express');
const router = express.Router();
const uwuController = require('../controllers/KemoController');

router.post('/', uwuController.uwuifyText);

module.exports = router;
