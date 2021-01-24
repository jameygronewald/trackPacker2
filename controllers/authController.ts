import { retrieveUser } from '../services/authService';

// AUTHENTICATE A REQUEST
export const getUser = async (req: any, res) => {
  const userId: string = req.user.id;

  let output = { status: 500, data: {} };

  try {
    const user = await retrieveUser(userId);

    output = { status: 201, data: user };
  } catch (error) {
    console.error(error.message);

    output = { status: 401, data: { errorMessage: error.message } };
  }
  res.status(output.status).send(output.data);
};
