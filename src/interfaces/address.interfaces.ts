export interface IAddressUpdatedRequest {
  street?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  number?: string;
}

export interface IAddressRequest{
  street: string;
  city: string;
  zipCode: string;
  state: string;
  number: string;
}

export interface IAddressUpdatedResponse {
  id: number;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  number: string;
}
