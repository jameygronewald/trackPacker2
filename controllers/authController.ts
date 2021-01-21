import db from '../models';

// AUTHENTICATE A REQUEST
export const getUser = async (req: any, res) => {
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

    res.status(201).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Invalid jwt.' });
  }
};

