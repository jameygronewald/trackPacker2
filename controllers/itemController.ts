import db from '../models';
import { InventoryItem } from '../utils/interfaces';

// ADD NEW ITEM TO INVENTORY
export const postItem = async (req: any, res) => {
  const { name, status } = req.body;
  const { id: userId } = req.user;

  let output = { status: 500, data: {} };

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

    output = { status: 200, data: user };
  } catch (error) {
    console.error(error.message);

    output = {
      status: 500,
      data: { errorMessage: 'Server error.' },
    };
  }
  res.status(output.status).send(output.data);
};

// EDIT ITEM STATUS
export const putItem = async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  let output = { status: 500, data: {} };

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

    output = { status: 200, data: { user, message: 'Item was updated!' } };
  } catch (error) {
    console.error(error.message);
    
    output = {
      status: 500,
      data: { errorMessage: 'Server error.' },
    };
  }
  res.status(output.status).send(output.data);
};

// DELETE AN ITEM
export const deleteItem = async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  let output = { status: 500, data: {} };

  try {
    const userToUpdate = await db.User.findOne({ _id: userId }).populate(
      'items'
    );
    if (!userToUpdate) throw new Error('Unable to delete item.');

    const indexToRemove: number = userToUpdate.items
      .map((item: InventoryItem) => item._id)
      .indexOf(id);

    userToUpdate.items.splice(indexToRemove, 1);

    await userToUpdate.save();

    const itemToDelete = await db.Item.findById(id);

    await itemToDelete.deleteOne();

    const user = await db.User.findOne({ _id: userId })
      .populate('items')
      .populate({
        path: 'excursions',
        populate: {
          path: 'items',
        },
      });

    output = {
      status: 200,
      data: { user, message: 'Item was removed from inventory.' },
    };
  } catch (error) {
    console.error(error.message);

    output = {
      status: 500,
      data: { errorMessage: 'Server error.' },
    };
  }
  res.status(output.status).send(output.data);
};
