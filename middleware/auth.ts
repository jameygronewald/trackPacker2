import * as jwt from 'jsonwebtoken';

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
  
    //Check if no token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization failed.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
      //   req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token is not valid.' });
    }
  };
  