import { InventoryItem } from '../Inventory/interfaces';

export interface Excursion {
  _id: string;
  name: string;
  items: InventoryItem[];
  __v: number;
}

export interface NewExcursion {
  name: string;
}
