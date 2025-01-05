const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  console.log('🔍 Incoming Request Body:', req.body);
  console.log('🔑 Authorization Header:', req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🛡️ Token:', token);

      if (!token) {
        return res.status(401).json({ message: 'Token missing in Authorization header.' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token Decoded:', decoded);

      if (decoded.id) {
        req.user = await User.findById(decoded.id).select('-password');
      } else if (decoded.username) {
        req.user = { username: decoded.username }; // Temporary fallback
      } else {
        throw new Error('Token is invalid. No user ID or username.');
      }

      console.log('👤 Authenticated User:', req.user);

      next();
    } catch (error) {
      console.error('❌ Authorization Error:', error.message);

      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired. Please log in again.' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token.' });
      }
      return res.status(401).json({ message: 'Unauthorized access.' });
    }
  } else {
    console.error('⚠️ No Token Provided in Headers');
    res.status(401).json({ message: 'No token provided in Authorization header.' });
  }
};
