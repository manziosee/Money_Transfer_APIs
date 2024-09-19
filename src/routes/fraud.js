const express = require('express');
const router = express.Router();
const fraudDetection = require('../utils/fraudDetection');

// Fraud detection (simplified)
router.post('/detect', async (req, res) => {
  const { transactionId } = req.body;
  const isFraudulent = fraudDetection.detectFraud(transactionId);
  res.json({ isFraudulent });
});

module.exports = router;
