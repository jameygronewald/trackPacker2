import * as express from 'express';
const router = express.Router();
import db from '../models';
import checkToken from '../middleware/checkToken';

// ADD AN EXCURSION
router.post('/', checkToken, async (req: any, res) => {
  const { name } = req.body;
  const { id: userId } = req.user;

  try {
    if (!name) throw new Error('Unable to create new excursion.');

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate('excursions');
    if (!user) throw new Error('Unable to create new excursion.');

    const newExcursion = new db.Excursion({ name });

    const excursion = await newExcursion.save();

    user.excursions.push(excursion);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

// DELETE AN EXCURSION
router.delete('/:id', checkToken, async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    if (!id) throw new Error('Unable to delete excursion.');

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate('excursions');
    if (!user) throw new Error('Unable to delete excursion.');

    const indexToRemove: number = user.excursions.map(excursion => excursion._id).indexOf(id);

    user.excursions.splice(indexToRemove, 1);
    await user.save();

    await db.Excursion.findByIdAndDelete(id);

    res.status(200).json({ user, message: 'Successfully deleted excursion.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

module.exports = router;
