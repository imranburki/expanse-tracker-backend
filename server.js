const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  res.status(201).json({ username });
  console.log('user created...')
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  res.status(201).json({username});
  console.log('login successfuly...')
});
app.post('/logout', (req, res) => {
  // Example logout logic
  try {
    // Clear session or authentication tokens
    console.log('logout successfuly...')
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
