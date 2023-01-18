export interface IProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface IProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
}

export interface iProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  available?: boolean;
}
