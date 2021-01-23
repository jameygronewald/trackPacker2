import db from '../models';

export const retrieveUser = async (userId: string) => {
  try {
    if (!userId) throw new Error('Invalid jwt.');

    const user = await db.User.findById(userId)
      .select('-password')
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
