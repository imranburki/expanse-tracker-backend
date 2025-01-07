const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Signup Controller
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', username });
    console.log('User created successfully...');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { username,password} = req.body;
  // const password='asd123';
  // console.log('the req.body in login Controller ........',req.body)
  if (!username) {
    return res.status(400).json({ message: 'the Username is required ' });
  }
  if (!password) {
    // const password='asd123';
//    console.log('the current password is ',password)
    return res.status(400).json({ message: 'the password is required ' });
  }
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }
    //JWT_SECRET=your_secret_key
    // const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '48h' });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    //res.json({ token });
  //  console.log('the token is ', token)
    
    res.status(200).json({
      message: 'Login successful.',
      username,
      token // Ensure token is sent back
    });
    console.log('Login successful...kkkk');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Logout Controller (example logic)
exports.logout = (req, res) => {
  try {
    // Clear session or authentication tokens if necessary
    console.log('Logout successful...');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
};
