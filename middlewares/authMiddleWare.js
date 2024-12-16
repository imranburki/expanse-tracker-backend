const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware to secure routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user associated with the token
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error('Authorization error:', error.message);
      return res.status(401).json({ message: 'Unauthorized access.' });
    }
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};


// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const decoded = jwt.verify(token, process.env.JWT_SECRET);


// exports.protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//         console.error('Authorization error:', error.message);
//         return res.status(401).json({ message: 'Unauthorized access.' });
//       }
//   } else {
//     res.status(401).json({ message: 'No token provided.' });
//   }
// };
