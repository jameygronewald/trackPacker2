import * as express from 'express';
const router = express.Router();
import checkToken from '../middleware/checkToken';
import db from '../models';
import { InventoryItem } from '../utils/interfaces';

// ADD NEW ITEM TO INVENTORY
router.post('/', checkToken, async (req: any, res) => {
  const { name, status } = req.body;
  const { id: userId } = req.user;

  try {
    if (!name || !status) throw new Error('Unable to create new item.');

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    if (!user) throw new Error('Unable to create new item.');

    const newItem = new db.Item({ name, status });
    const item: InventoryItem = await newItem.save();

    user.items.push(item);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

// EDIT ITEM STATUS
router.put('/:id', checkToken, async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const itemToUpdate = await db.Item.findOne({ _id: id });
    let { status } = itemToUpdate;

    itemToUpdate.status = status === 'Inventory' ? 'Wishlist' : 'Inventory';

    await itemToUpdate.save();

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    if (!user) throw new Error('Unable to update item.');

    res.status(200).json({ user, message: 'Item was updated!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

// DELETE AN ITEM
router.delete('/:id', checkToken, async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });
    if (!user) throw new Error('Unable to delete item.');

    const indexToRemove: number = user.items.map((item: InventoryItem) => item._id).indexOf(id);

    user.items.splice(indexToRemove, 1);

    await user.save();

    await db.Item.findById(id);

    res.status(200).json({ user, message: 'Item was removed from inventory.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

module.exports = router;
