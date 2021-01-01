import * as express from 'express';
const router = express.Router();
import db from '../models';
import createToken from '../utils/createToken';

router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    let user = await db.User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    user = new db.User({ email, password, firstName, lastName });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = createToken(payload);
    return res.json({ token });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Unable to create new user.' });
  }
});

module.exports = router;
