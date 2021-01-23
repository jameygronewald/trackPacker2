import { loginUser, registerUser } from '../services/userService';

// LOGIN A USER
export const postUser = async (req, res) => {
  const { email, password } = req.body;

  let output = { status: 500, data: {} };

  try {
    const token = await loginUser(email, password);

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
    const token = await registerUser(email, password, firstName, lastName);

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
