const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.sendMoney = async (req, res) => {
  const { to, amount, currency } = req.body;
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(to);
    if (!receiver) {
      return res.status(400).json({ msg: 'Receiver not found' });
    }
    if (sender.wallet < amount) {
      return res.status(400).json({ msg: 'Insufficient funds' });
    }
    sender.wallet -= amount;
    receiver.wallet += amount;
    await sender.save();
    await receiver.save();
    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      currency,
      status: 'completed',
    });
    await transaction.save();
    res.json({ msg: 'Transaction successful', transaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.checkBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.wallet });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.transactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
