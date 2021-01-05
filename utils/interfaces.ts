export interface Payload {
  user: {
    id: string;
  };
}

export interface InventoryItem {
  _id: string;
  name: string;
  status: string;
  __v: number;
}