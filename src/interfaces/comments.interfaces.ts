import { IProductResponse } from "./products.interfaces";
import { IDataUserResponse } from "./users.interface";

export interface ICommentsRequest {
  comments_text: string;
}

export interface ICommentsResponse {
  comments_text: string;
  user: IDataUserResponse;
  product: IProductResponse;
  deletedAt?: null | Date;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
