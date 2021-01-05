import { InventoryItem } from '../Inventory/interfaces';

export interface ExcursionQueryParams {
  id: string;
}

export interface AddToExcursionListProps {
  excursionId: string;
  addItemToExcursion: (id: string, item: InventoryItem) => Promise<void>;
}
