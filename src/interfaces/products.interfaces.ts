export interface IProductRequest {
  name: string;
  description: string;
  price: number;
  amount: number;
}

export interface IProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  available: boolean;
}

export interface iProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  amount?: number;
  available?: boolean;
}
