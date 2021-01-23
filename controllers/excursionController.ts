import db from '../models';
import {
  addExcursion,
  removeExcursion,
  // addItemToExcursion,
  // removeItemFromExcursion,
} from '../services/excursionService';
import { InventoryItem, IExcursion } from '../utils/interfaces';

// ADD AN EXCURSION
export const postExcursion = async (req: any, res) => {
  const { name } = req.body;
  const { id: userId } = req.user;

  let output = { status: 500, data: {} };

  try {
    const user = await addExcursion(name, userId);

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

// DELETE AN EXCURSION
export const deleteExcursion = async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  let output = { status: 500, data: {} };

  try {
    if (!id) throw new Error('Unable to delete excursion.');

    const user = await removeExcursion(id, userId);

    output = {
      status: 200,
      data: { user, message: 'Successfully deleted excursion.' },
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

// ADD ITEM TO EXCURSION
export const putExcursionAddItem = async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const item: InventoryItem = req.body;

  let output = { status: 500, data: {} };

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

    output = {
      status: 200,
      data: { user, message: 'Successfully added item to excursion.' },
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

// DELETE AN ITEM FROM AN EXCURSION
export const putExcursionDeleteItem = async (req: any, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const item: InventoryItem = req.body;

  let output = { status: 500, data: {} };

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

    output = {
      status: 200,
      data: { user, message: 'Successfully deleted item from excursion.' },
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
