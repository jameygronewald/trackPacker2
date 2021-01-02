import * as jwt from 'jsonwebtoken';
import { Payload } from './interfaces';
require('dotenv').config();

const createToken = (payload: Payload): string =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

export default createToken;
