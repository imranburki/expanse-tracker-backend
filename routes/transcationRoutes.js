const express = require('express');
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require('../controllers/transcationController');
const { protect } = require('../middlewares/authMiddleWare');
const router = express.Router();

// GET and POST /
router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

// DELETE /transactions/:id
router.route('/:id').delete(protect, deleteTransaction);

module.exports = router;
