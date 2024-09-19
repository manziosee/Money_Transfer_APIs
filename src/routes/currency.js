const express = require('express');
const router = express.Router();

// Currency exchange (simplified)
router.post('/exchange', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  // Simplified exchange rate
  const exchangeRate = 1.2; // Example rate
  const convertedAmount = amount * exchangeRate;
  res.json({ convertedAmount });
});

// International remittances (simplified)
router.post('/remittance', async (req, res) => {
  const { amount, fromCurrency, toCurrency, receiverId } = req.body;
  // Simplified exchange rate
  const exchangeRate = 1.2; // Example rate
  const convertedAmount = amount * exchangeRate;
  // Process the remittance (simplified)
  res.json({ convertedAmount, receiverId });
});

module.exports = router;
