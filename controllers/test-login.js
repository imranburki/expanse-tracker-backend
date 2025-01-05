const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

// Login Controller
exports.testlogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  

  try {
    console.log('the token is ', token)
    res.status(200).json({ message: 'Login successful.', username,token });
    console.log('Login successful...');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};