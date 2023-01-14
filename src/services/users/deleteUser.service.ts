import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (userToDelete: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userToDelete });

  await userRepository.softRemove(user);
  userRepository.save(user);
};

export default deleteUserService;
