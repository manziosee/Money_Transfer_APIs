const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.sendRemittance = async (req, res) => {
  const { to, amount, currency, exchangeRate } = req.body;
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(to);
    if (!receiver) {
      return res.status(400).json({ msg: 'Receiver not found' });
    }
    if (sender.wallet < amount) {
      return res.status(400).json({ msg: 'Insufficient funds' });
    }
    const convertedAmount = amount * exchangeRate;
    sender.wallet -= amount;
    receiver.wallet += convertedAmount;
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
    res.json({ msg: 'Remittance successful', transaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
