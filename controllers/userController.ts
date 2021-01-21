import db from '../models';
import createToken from '../utils/createToken';

// LOGIN A USER
export const postUser = async (req, res) => {
  const { email, password } = req.body;

  let output = { status: 500, data: {} };

  try {
    const user = await db.User.findOne({ email });

    if (password !== user.password) throw new Error('Invalid Password.');

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = createToken(payload);

    output = { status: 201, data: { token } };
  } catch (error) {
    console.error(error.message);

    output = {
      status: 401,
      data: { errorMessage: 'Invalid credentials.' },
    };
  }
  res.status(output.status).send(output.data);
};

// REGISTER A NEW USER
export const postNewUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  let output = { status: 500, data: {} };

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

    output = { status: 201, data: { token } };
  } catch (error) {
    console.error(error.message);

    output = {
      status: 500,
      data: { errorMessage: 'Unable to create new user.' },
    };
  }
  res.status(output.status).send(output.data);
};
