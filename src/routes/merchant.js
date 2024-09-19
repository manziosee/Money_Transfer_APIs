const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');
const Wallet = require('../models/Wallet');

// Onboard merchant
router.post('/onboard', async (req, res) => {
  const { name, email } = req.body;
  const wallet = new Wallet({ balance: 0 });
  await wallet.save();

  const merchant = new Merchant({
    name,
    email,
    wallet: wallet._id
  });
  await merchant.save();
  res.json(merchant);
});

// Process payment
router.post('/payment', async (req, res) => {
  const { merchantId, amount } = req.body;
  const merchantWallet = await Wallet.findOne({ user: merchantId });
  merchantWallet.balance += amount;
  await merchantWallet.save();
  res.json(merchantWallet);
});

module.exports = router;
