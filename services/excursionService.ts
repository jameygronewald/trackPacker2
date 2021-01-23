import db from '../models';
import { retrieveUser } from './authService';
import { InventoryItem, IExcursion } from '../utils/interfaces';

// ADD AN EXCURSION
export const addExcursion = async (name: string, userId: string) => {
  try {
    if (!name) throw new Error('Unable to create new excursion.');

    const user = await retrieveUser(userId);
    if (!user) throw new Error('Unable to create new excursion.');

    const newExcursion = new db.Excursion({ name });

    const excursion: IExcursion = await newExcursion.save();

    user.excursions.push(excursion);
    await user.save();

    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// DELETE AN EXCURSION
export const removeExcursion = async (excursionId: string, userId: string) => {
  try {
    if (!excursionId) throw new Error('Unable to delete excursion.');

    const user = await retrieveUser(userId);

    const indexToRemove: number = user.excursions
      .map((excursion: IExcursion) => excursion._id)
      .indexOf(excursionId);

    user.excursions.splice(indexToRemove, 1);
    await user.save();

    await db.Excursion.findByIdAndDelete(excursionId);

    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// ADD ITEM TO EXCURSION
// export const addItemToExcursion = async (excursionId: string) => {
//   try {
//     if (!id) throw new Error('Unable to add item to excursion.');

//     const excursionToUpdate = await db.Excursion.findById(id).populate('items');

//     const duplicate: InventoryItem | undefined = excursionToUpdate.items.find(
//       (excursionItem: InventoryItem) => excursionItem._id == item._id
//     );
//     if (duplicate) throw new Error('Item is already on this excursion.');

//     excursionToUpdate.items.push(item);

//     await excursionToUpdate.save();

//     const user = await db.User.findOne({ _id: userId })
//       .populate('items')
//       .populate({
//         path: 'excursions',
//         populate: {
//           path: 'items',
//         },
//       });
//     if (!user) throw new Error('Unable to add item to excursion.');
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// // DELETE AN ITEM FROM AN EXCURSION
// export const removeItemFromExcursion = async (excursionId: string) => {
//   try {
//     if (!id) throw new Error('Unable to delete item from excursion.');

//     const excursionToUpdate = await db.Excursion.findById(id).populate('items');

//     const indexToRemove: number = excursionToUpdate.items
//       .map((excursionItem: InventoryItem) => excursionItem._id)
//       .indexOf(item._id);
//     if (indexToRemove === -1) throw new Error('Could not find item to delete.');

//     excursionToUpdate.items.splice(indexToRemove, 1);

//     await excursionToUpdate.save();

//     const user = await db.User.findOne({ _id: userId })
//       .populate('items')
//       .populate({
//         path: 'excursions',
//         populate: {
//           path: 'items',
//         },
//       });
//     if (!user) throw new Error('Unable to delete item from excursion.');

//     output = {
//       status: 200,
//       data: { user, message: 'Successfully deleted item from excursion.' },
//     };
//   } catch (error) {
//     console.error(error.message);

//     output = {
//       status: 500,
//       data: { errorMessage: 'Server error.' },
//     };
//   }
//   res.status(output.status).send(output.data);
// };
