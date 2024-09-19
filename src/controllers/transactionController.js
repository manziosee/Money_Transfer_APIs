const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.sendMoney = async (req, res) => {
  const { receiverId, amount, currency } = req.body;
  const senderId = req.user.id;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (sender.wallet < amount) {
      return res.status(400).json({ msg: 'Insufficient funds' });
    }

    const transaction = new Transaction({
      sender: senderId,
      receiver: receiverId,
      amount,
      currency,
      status: 'completed',
    });

    await transaction.save();

    sender.wallet -= amount;
    receiver.wallet += amount;

    await sender.save();
    await receiver.save();

    res.json({ msg: 'Transaction successful', transaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.wallet });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTransactions = async (req, res) => {
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
