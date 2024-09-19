const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const walletRoutes = require('./routes/wallet');
const transactionRoutes = require('./routes/transaction');
const merchantRoutes = require('./routes/merchant');
const currencyRoutes = require('./routes/currency');
const fraudRoutes = require('./routes/fraud');

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/wallet', walletRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/fraud', fraudRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
