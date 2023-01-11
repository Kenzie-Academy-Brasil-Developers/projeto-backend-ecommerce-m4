import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";

export interface IAdress {
  id: number;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  number: string;
}

export interface IDataUser {
  name: string;
  age: number;
  password: string;
  email: string;
  address: IAdress;
}

const createUserService = async ({ address, ...dataUser }: IDataUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const newAddress: IAdress = addressRepository.create(address as IAdress);
  await addressRepository.save(newAddress);
  console.log(newAddress);

  const user = userRepository.create({ ...dataUser, address: newAddress });
  await userRepository.save(user);

  return user;
};

export default createUserService;
