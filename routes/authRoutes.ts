import express from 'express';
import checkToken from '../middleware/checkToken';
import { getUser } from '../controllers/authController';

const router = express.Router();

// AUTHENTICATE A REQUEST
router.get('/', checkToken, getUser);

module.exports = router;
