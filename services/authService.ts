import db from '../models';

export const findUser = async (userId: string) => {
  try {
    const user = await db.User.findById(userId)
      .select('-password -_id')
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });

    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
