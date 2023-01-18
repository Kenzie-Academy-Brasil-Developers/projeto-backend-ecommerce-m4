import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IUpdateUserRequest } from "../../interfaces/users.interface";

const upadateUserService = async (
  userId: string,
  dataUser: IUpdateUserRequest
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found");
  }

  const updatedUser = { ...user, ...dataUser };

  if (dataUser.password) updatedUser.password = hashSync(dataUser.password, 10);
  await userRepository.save(updatedUser);

  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export default upadateUserService;
