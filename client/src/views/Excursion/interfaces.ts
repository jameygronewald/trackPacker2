import { InventoryItem } from '../Inventory/interfaces';

export interface ExcursionQueryParams {
  id: string;
}

export interface AddToExcursionListProps {
  excursionId: string;
  addItemToExcursion: (id: string, item: InventoryItem) => Promise<void>;
}

export interface ExcursionInventoryListProps {
  excursionId: string;
  item: InventoryItem;
  deleteItemFromExcursion: (id: string, item: InventoryItem) => Promise<void>;
}
