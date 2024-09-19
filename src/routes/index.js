const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/payment', require('./payment'));
router.use('/remittance', require('./remittance'));

module.exports = router;
