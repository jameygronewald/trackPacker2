import { InventoryItem } from '../Inventory/interfaces';

export interface IExcursion {
  _id: string;
  name: string;
  items: InventoryItem[];
  __v: number;
}

export interface NewExcursion {
  name: string;
}

export interface ExcursionCardProps {
  excursionId: string;
  excursionName: string;
  deleteExcursion: (id: string) => Promise<void>;
}
