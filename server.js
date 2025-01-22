const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transcationRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


// Allow multiple origins or set to '*'
app.use(cors({
  origin: 'http://54.145.87.82', // Allow frontend's exact origin
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

//const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'];
// const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['54.145.87.82'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
// }));

// Middleware
app.use(express.json());

// Use the user routes
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const transactionRoutes = require('./routes/transcationRoutes');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();
// // const cors = require('cors');

// // Allow multiple origins or set to '*'
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));

// // Middleware
// // app.use(cors({
// //   origin: 'http://localhost:3001', // Replace with your frontend URL
// //   methods: 'GET,POST,PUT,DELETE',
// //   credentials: true,
// // }));
// app.use(express.json());

// // Use the user routes
// app.use('/users', userRoutes);
// app.use('/transactions', transactionRoutes);
// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const cors = require('cors');
// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const dotenv = require('dotenv');
// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();


// const app = express();



// app.use(cors());
// app.use(express.json());

// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required.' });
//   }

//   res.status(201).json({ username });
//   console.log('user created...')
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   console.log(req.body)
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required.' });
//   }

//   res.status(201).json({username});
//   console.log('login successfuly...')
// });
// app.post('/logout', (req, res) => {
//   // Example logout logic
//   try {
//     // Clear session or authentication tokens
//     console.log('logout successfuly...')
//     res.status(200).json({ message: 'Logout successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Logout failed' });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
