import * as jwt from 'jsonwebtoken';
require('dotenv').config();

const checkToken = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  //Check if no token
  if (!token) return res.status(401).json({ msg: 'No token, authorization failed.' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};

export default checkToken;
