import {
  addItemToInventory,
  updateItemStatus,
  removeItemFromInventory,
} from '../services/itemService';

// ADD NEW ITEM TO USER'S INVENTORY
export const postItem = async (req: any, res) => {
  const { name, status } = req.body;
  const { id: userId } = req.user;

  let output = { status: 500, data: {} };

  try {
    const user = await addItemToInventory(name, status, userId);

    output = { status: 200, data: user };
  } catch (error) {
    console.error(error);

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
    const user = await updateItemStatus(id, userId);

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
    const user = await removeItemFromInventory(id, userId);

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
