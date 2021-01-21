import db from '../models';
import createToken from '../utils/createToken';

// LOGIN A USER
export const postUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ email });

    if (password !== user.password) throw new Error('Invalid Password.');

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = createToken(payload);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Invalid credentials.' });
  }
};

// REGISTER A NEW USER
export const postNewUser = async (req, res) => {
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
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Unable to create new user.' });
  }
};
