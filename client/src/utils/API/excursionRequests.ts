import axios from 'axios';
import { NewExcursion } from '../../views/Excursions/interfaces';
import { InventoryItem } from '../../views/Inventory/interfaces';

export const excursionRequests = {
  addExcursion: (name: NewExcursion) => axios.post('/api/excursion', name),

  deleteExcursion: (id: string) => axios.delete(`/api/excursion/${id}`),

  addItemToExcursion: (id: string, item: InventoryItem) =>
    axios.put('/api/excursion/${id}', item),
};
