import * as express from 'express';
const router = express.Router();
import checkToken from '../middleware/checkToken';
import db from '../models';

// ADD NEW ITEM TO INVENTORY
router.post('/', checkToken, async (req: any, res) => {
  const { name, status } = req.body;
  const { id: userId } = req.user;

  try {
    if (!name || !status) throw new Error('Unable to create new item.');

    const user = await db.User.findOne({ _id: userId }).populate('items');
    if (!user) throw new Error('Unable to create new item.');

    const newItem = new db.Item({ name, status });
    const item = await newItem.save();

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
    // const user = await db.User.findOne({ _id: userId }).populate('items');
    // if (!user) throw new Error('Unable to create new item.');

    const itemToUpdate = await db.Item.findOne({ _id: id });
    let { status } = itemToUpdate;

    itemToUpdate.status = status === 'Inventory' ? 'Wishlist' : 'Inventory';

    const item = await itemToUpdate.save();

    // user.items.push(item);
    // await user.save();
    const user = await db.User.findOne({ _id: userId }).populate('items');

    res.status(200).json({ user, message: 'Item was updated!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
    });
  }
});

module.exports = router;
