import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";

const deleteUserService = async (userId: string): Promise<null> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found");
  }
  await userRepository.softRemove(user);
  userRepository.save(user);

  return;
};

export default deleteUserService;
