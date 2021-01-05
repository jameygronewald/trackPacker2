import axios from 'axios';
import { NewInventoryItem } from '../../views/Inventory/interfaces';

export const itemRequests = {
  addItemToInventory: (newItem: NewInventoryItem) =>
    axios.post('/api/item', newItem),

  updateItemStatus: (id: string) => axios.put(`/api/item/${id}`),

  deleteItemFromInventory: (id: string) => axios.delete(`/api/item/${id}`),
};
