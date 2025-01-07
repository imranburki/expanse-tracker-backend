const Transaction = require('../models/Transcation');

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
  try {
    console.log('Fetching transactions for user:', req.user.id);
    const transactions = await Transaction.find({ userId: req.user.id });
    console.log(`the record of user: ${req.user.id} is ${transactions}`)
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// exports.getTransactions = async (req, res) => {
//   console.log('Inside GetTranscation... ',req.body)
//   const transactions = await Transaction.find({ userId: req.user.id });
//   console.log('one')
//   res.status(200).json(transactions);
// };

// Add a transaction
exports.addTransaction = async (req, res) => {
  const { text, amount } = req.body;
  // console.log('the req.body in transcationController.js ',req.body)
  // console.log('the req.user is ', req.user)
  const transaction = await Transaction.create({ text, amount, userId: req.user.id });
  // console.log('two')
  res.status(201).json(transaction);
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction.userId.toString() !== req.user.id.toString()) {
    console.log('three')
    return res.status(401).json({ message: 'Not authorized.' });
  }  
  await Transaction.deleteOne({ _id: req.params.id });

  console.log('four')
  res.status(200).json({ message: 'Transaction deleted.' });
};
