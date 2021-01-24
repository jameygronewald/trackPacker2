import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDB from './config/db';

const app = express();

// Database connection from config directory
connectDB();

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

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

const PORT: string | 3001 = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
