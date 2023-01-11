import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listAllUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: { address: true } });

  return users;
};

export default listAllUsersService;
