import axios from 'axios';
import { NewInventoryItem } from '../../views/Inventory/interfaces';

export const itemRequests = {
  addItemToInventory: (newItem: NewInventoryItem) => axios.post('/api/item', newItem),
};
