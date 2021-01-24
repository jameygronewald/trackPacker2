import db from '../models';
import createToken from '../utils/createToken';
import { Payload } from '../utils/interfaces';

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await db.User.findOne({ email });

    if (password !== user.password) throw new Error('Invalid Password.');

    const payload: Payload = {
      user: {
        id: user.id,
      },
    };

    return createToken(payload);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    let user = await db.User.findOne({ email });

    if (user) {
      throw new Error('User already exists.');
    }

    user = new db.User({ email, password, firstName, lastName });

    await user.save();

    const payload: Payload = {
      user: {
        id: user.id,
      },
    };

    return createToken(payload);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
