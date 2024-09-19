const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const User = require('../models/User');
const auth = require('../utils/auth');

// Send money
router.post('/send', auth, async (req, res) => {
  const { receiverId, amount } = req.body;
  const senderWallet = await Wallet.findOne({ user: req.user.id });
  const receiverWallet = await Wallet.findOne({ user: receiverId });

  if (senderWallet.balance >= amount) {
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;
    await senderWallet.save();
    await receiverWallet.save();

    const transaction = new Transaction({
      sender: req.user.id,
      receiver: receiverId,
      amount,
      status: 'completed'
    });
    await transaction.save();
    res.json(transaction);
  } else {
    res.status(400).json({ msg: 'Insufficient funds' });
  }
});

// Receive money
router.post('/receive', auth, async (req, res) => {
  const { senderId, amount } = req.body;
  const receiverWallet = await Wallet.findOne({ user: req.user.id });
  const senderWallet = await Wallet.findOne({ user: senderId });

  if (senderWallet.balance >= amount) {
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;
    await senderWallet.save();
    await receiverWallet.save();

    const transaction = new Transaction({
      sender: senderId,
      receiver: req.user.id,
      amount,
      status: 'completed'
    });
    await transaction.save();
    res.json(transaction);
  } else {
    res.status(400).json({ msg: 'Insufficient funds' });
  }
});

// Request money
router.post('/request', auth, async (req, res) => {
  const { receiverId, amount } = req.body;
  const transaction = new Transaction({
    sender: req.user.id,
    receiver: receiverId,
    amount,
    status: 'pending'
  });
  await transaction.save();
  res.json(transaction);
});

module.exports = router;
