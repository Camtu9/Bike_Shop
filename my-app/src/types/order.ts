import { Address } from "./address";
import { Product } from "./product";

export type OrderItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: Address;
  status: string;
  date: number;
};
