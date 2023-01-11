import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IDataUser } from "./createUser.service";

const listAllUsersService = async (): Promise<IDataUser[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: { address: true } });

  return users;
};

export default listAllUsersService;
