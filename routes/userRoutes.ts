import express from 'express';
import { postUser, postNewUser } from '../controllers/userController';

const router = express.Router();

// LOGIN A USER
router.post('/', postUser);

// REGISTER A NEW USER
router.post('/register', postNewUser);

module.exports = router;
