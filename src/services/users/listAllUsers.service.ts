import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IDataUserResponse } from "../../interfaces/users.interface";

const listAllUsersService = async (): Promise<IDataUserResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: { address: true } });

  return users;
};

export default listAllUsersService;
