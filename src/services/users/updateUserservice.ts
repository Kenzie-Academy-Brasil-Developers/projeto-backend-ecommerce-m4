import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IDataUserResponse } from "./createUser.service";

export interface IUpdateUser {
  name: string;
  age: number;
  password: string;
  email: string;
}

const upadateUserService = async (
  userId: string,
  dataUser: IUpdateUser
): Promise<IDataUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found");
  }

  const updatedUser = userRepository.create({ ...user, ...dataUser });
  await userRepository.save(updatedUser);
  return updatedUser;
};

export default upadateUserService;
