const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const User = require('../models/User');
const auth = require('../utils/auth');

// Deposit money
router.post('/deposit', auth, async (req, res) => {
  const { amount } = req.body;
  const wallet = await Wallet.findOne({ user: req.user.id });
  wallet.balance += amount;
  await wallet.save();
  res.json(wallet);
});

// Withdraw money
router.post('/withdraw', auth, async (req, res) => {
  const { amount } = req.body;
  const wallet = await Wallet.findOne({ user: req.user.id });
  if (wallet.balance >= amount) {
    wallet.balance -= amount;
    await wallet.save();
    res.json(wallet);
  } else {
    res.status(400).json({ msg: 'Insufficient funds' });
  }
});

// Check balance
router.get('/balance', auth, async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user.id });
  res.json(wallet);
});

module.exports = router;
