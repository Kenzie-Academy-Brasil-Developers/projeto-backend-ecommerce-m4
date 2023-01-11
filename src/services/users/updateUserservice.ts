import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";

const upadateUserService = async (userId, dataUser) => {
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
