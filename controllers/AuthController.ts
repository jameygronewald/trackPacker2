import * as express from 'express';
const router = express.Router();
import auth from '../middleware/auth';
import db from '../models';

router.get('/', auth, (req, res) => {
  res.json({ msg: 'hit' });
});

router.post('/register', (req, res) => {
  console.log(req.body);
  res.json({ msg: 'hit' });
});

module.exports = router;
