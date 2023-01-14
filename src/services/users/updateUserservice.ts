import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import {
  IDataUserResponse,
  IUpdateUserRequest,
} from "../../interfaces/users.interface";

const upadateUserService = async (
  userId: string,
  dataUser: IUpdateUserRequest
): Promise<IDataUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found");
  }

  const updatedUser = userRepository.update(user.id, { ...user, ...dataUser });
  const returnUser = { ...user, ...dataUser };
  return returnUser;
};

export default upadateUserService;
