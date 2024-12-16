const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
