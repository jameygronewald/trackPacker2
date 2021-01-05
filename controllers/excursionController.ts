import * as express from 'express';
const router = express.Router();
import db from '../models';
import checkToken from '../middleware/checkToken';
import { InventoryItem, IExcursion } from '../utils/interfaces';

// ADD AN EXCURSION
router.post('/', checkToken, async (req: any, res) => {
  const { name } = req.body;
  const { id: userId } = req.user;

  try {
    if (!name) throw new Error('Unable to create new excursion.');

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    if (!user) throw new Error('Unable to create new excursion.');

    const newExcursion = new db.Excursion({ name });

    const excursion: IExcursion = await newExcursion.save();

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
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    if (!user) throw new Error('Unable to delete excursion.');

    const indexToRemove: number = user.excursions
      .map((excursion: IExcursion) => excursion._id)
      .indexOf(id);

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

// ADD ITEM TO EXCURSION
router.put('/add/:id', checkToken, async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const item: InventoryItem = req.body;

  try {
    if (!id) throw new Error('Unable to add item to excursion.');

    const excursionToUpdate = await db.Excursion.findById(id).populate('items');

    const duplicate: InventoryItem | undefined = excursionToUpdate.items.find(
      (excursionItem: InventoryItem) => excursionItem._id == item._id
    );
    if (duplicate) throw new Error('Item is already on this excursion.');

    excursionToUpdate.items.push(item);

    await excursionToUpdate.save();

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    if (!user) throw new Error('Unable to add item to excursion.');

    res
      .status(200)
      .json({ user, message: 'Successfully added item to excursion.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

// DELETE AN ITEM FROM AN EXCURSION
router.put('/delete/:id', checkToken, async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const item: InventoryItem = req.body;

  try {
    if (!id) throw new Error('Unable to delete item from excursion.');

    const excursionToUpdate = await db.Excursion.findById(id).populate('items');

    const indexToRemove: number = excursionToUpdate.items
      .map((excursionItem: InventoryItem) => excursionItem._id)
      .indexOf(item._id);
    if (indexToRemove === -1) throw new Error('Could not find item to delete.');

    excursionToUpdate.items.splice(indexToRemove, 1);

    await excursionToUpdate.save();

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    if (!user) throw new Error('Unable to delete item from excursion.');

    res
      .status(200)
      .json({ user, message: 'Successfully deleted item from excursion.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

module.exports = router;
