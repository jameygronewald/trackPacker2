import db from '../models';
import { retrieveUser } from '../services/authService';
import { InventoryItem } from '../utils/interfaces';

export const addItemToInventory = async (
  name: string,
  status: string,
  userId: string
) => {
  try {
    if (!name || !status) throw new Error('Unable to create new item.');

    const user = await retrieveUser(userId);
    if (!user) throw new Error('Unable to create new item.');

    const newItem = new db.Item({ name, status });
    const item: InventoryItem = await newItem.save();

    user.items.push(item);
    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateItemStatus = async (itemId: string, userId: string) => {
  try {
    if (!itemId) throw new Error('No item supplied.');

    const itemToUpdate = await db.Item.findOne({ _id: itemId });
    if (!itemToUpdate) throw new Error('Could not find item to update.');

    let { status } = itemToUpdate;

    itemToUpdate.status = status === 'Inventory' ? 'Wishlist' : 'Inventory';

    await itemToUpdate.save();

    const user = await retrieveUser(userId);
    if (!user) throw new Error('Unable to update item.');

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeItemFromInventory = async (
  itemId: string,
  userId: string
) => {
  try {
    const userToUpdate = await db.User.findOne({ _id: userId }).populate(
      'items'
    );
    if (!userToUpdate) throw new Error('Unable to delete item.');

    const indexToRemove: number = userToUpdate.items
      .map((item: InventoryItem) => item._id)
      .indexOf(itemId);

    userToUpdate.items.splice(indexToRemove, 1);

    await userToUpdate.save();

    const itemToDelete = await db.Item.findById(itemId);

    await itemToDelete.deleteOne();

    const user = await retrieveUser(userId);
    if (!user) throw new Error('Unable to update item.');

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
