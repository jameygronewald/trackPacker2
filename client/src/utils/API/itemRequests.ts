import axios from 'axios';
import { InventoryItem } from '../../views/Inventory/interfaces';

export const itemRequests = {
  addItemToInventory: (newItem: InventoryItem) =>
    axios.post('/api/item', newItem),
  updateItemStatus: (id: string) => axios.put(`/api/item/${id}`),
  deleteItemFromInventory: (id: string) => axios.delete(`/api/item/${id}`),
};
