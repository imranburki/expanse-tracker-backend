const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/signup', userController.signup);
router.get('/users', userController.getAllUsers);

// Route for user login
router.post('/login', userController.login);

// Route for user logout
router.post('/logout', userController.logout);

module.exports = router;