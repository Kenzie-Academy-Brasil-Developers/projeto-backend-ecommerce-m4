import { IProductResponse } from "./products.interfaces";

export interface IOrderRequest {
  orders: any;
  product: number;
  amount: number;
}

export interface IOrderProducts {
  id: number;
  amount: number;
  product: IProductResponse[];
}

export interface IOrderResponse {
  id: number;
  orderedAt: Date;
  delivered: boolean;
}
