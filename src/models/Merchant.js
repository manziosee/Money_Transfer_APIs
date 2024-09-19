const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }
});

module.exports = mongoose.model('Merchant', MerchantSchema);
