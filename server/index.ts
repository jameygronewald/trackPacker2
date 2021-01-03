const express = require('express');
const path = require('path');
const cors = require('cors');
const connect = require('./config/db');

const app = express();

// Database connection from config directory
connect();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route imports
app.use('/api/auth', require('../controllers/authController'));
app.use('/api/user', require('../controllers/userController'));
app.use('/api/item', require('../controllers/itemController'));
app.use('/api/excursion', require('../controllers/excursionController'));

// Check for production environment and serve static client build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
