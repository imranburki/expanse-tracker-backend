const Transaction = require('../models/Transcation');

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id });
  res.status(200).json(transactions);
};

// Add a transaction
exports.addTransaction = async (req, res) => {
  const { text, amount } = req.body;
  const transaction = await Transaction.create({ text, amount, userId: req.user.id });
  res.status(201).json(transaction);
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction.userId.toString() !== req.user.id.toString()) {
    return res.status(401).json({ message: 'Not authorized.' });
  }  
  await transaction.remove();
  res.status(200).json({ message: 'Transaction deleted.' });
};
