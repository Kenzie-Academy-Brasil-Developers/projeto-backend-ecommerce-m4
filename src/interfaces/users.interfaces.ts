export interface IAdress {
  id?: number;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  number: string;
}

export interface IDataUserRequest {
  name: string;
  age: number;
  password: string;
  email: string;
  address: IAdress;
}

export interface IDataUserUpdateResponse{
  id: string,
  name: string,
  age: number,
  email: string
}

export interface IDataUserResponse {
  id: string;
  name: string;
  age: number;
  password?: string;
  email: string;
  address: IAdress;
}

export interface IUpdateUserRequest {
  name?: string;
  age?: number;
  password?: string;
  email?: string;
}

export interface IBodyUser {
  id: string;
  isAdm: boolean;
}


