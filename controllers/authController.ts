import db from '../models';

// AUTHENTICATE A REQUEST
export const getUser = async (req: any, res) => {
  let output = { status: 500, data: {} };

  try {
    const userId = req.user.id;
    const user = await db.User.findById(userId)
      .select('-password -_id')
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    output = { status: 201, data: user };

  } catch (error) {
    console.error(error.message);
    
    output = { status: 401, data: { errorMessage: 'Invalid jwt.' } };
  }
  res.status(output.status).send(output.data);
};
