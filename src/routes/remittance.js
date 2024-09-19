const express = require('express');
const router = express.Router();
const { sendRemittance } = require('../controllers/remittanceController');
const auth = require('../middlewares/auth');

router.post('/send', auth, sendRemittance);

module.exports = router;
