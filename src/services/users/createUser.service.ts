import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";

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

export interface IDataUserResponse {
  id: string;
  name: string;
  age: number;
  password: string;
  email: string;
  address: IAdress;
}

const createUserService = async ({
  address,
  ...dataUser
}: IDataUser): Promise<IDataUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const findUser = await userRepository.findOneBy({ email: dataUser.email });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  const newAddress: IAdress = addressRepository.create(address as IAdress);
  await addressRepository.save(newAddress);
  console.log(newAddress);

  const user = userRepository.create({ ...dataUser, address: newAddress });
  await userRepository.save(user);

  return user;
};

export default createUserService;
