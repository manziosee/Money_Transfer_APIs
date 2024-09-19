const express = require('express');
const router = express.Router();
const { sendMoney, checkBalance, transactionHistory } = require('../controllers/paymentController');
const auth = require('../middlewares/auth');

router.post('/send', auth, sendMoney);
router.get('/balance', auth, checkBalance);
router.get('/transactions', auth, transactionHistory);

module.exports = router;
