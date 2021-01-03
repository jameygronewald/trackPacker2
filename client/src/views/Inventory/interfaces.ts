export interface NewInventoryItem {
  name: string;
  status: string;
}

export interface InventoryItem {
  _id: string;
  name: string;
  status: string;
  __v: number;
}

export interface InventoryListProps {
  updateItem: (itemId: string) => Promise<void>;
  deleteItem: (itemId: string) => Promise<void>;
}
