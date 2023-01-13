import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IDataUserRequest } from "../../interfaces/users.interface";

const createUserService = async ({
  address,
  ...dataUser
}: IDataUserRequest): Promise<IDataUserRequest> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const findUser = await userRepository.findOneBy({ email: dataUser.email });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  const newAddress = addressRepository.create(address);
  await addressRepository.save(newAddress);

  const user = userRepository.create({ ...dataUser, address: newAddress });
  await userRepository.save(user);

  return user;
};

export default createUserService;
