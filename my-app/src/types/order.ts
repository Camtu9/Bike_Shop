import { AddressData } from "./address";
import { ProductData } from "./product";

export type OrderItem = {
  product: ProductData;
  quantity: number;
};

export type OrderData = {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: AddressData;
  status: string;
  date: number;
};
