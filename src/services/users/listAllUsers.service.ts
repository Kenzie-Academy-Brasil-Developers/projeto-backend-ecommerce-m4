import AppDataSource from "../../data-source";
import { usersRepository } from "../../utils/repositories.ultil";
import { IDataUserResponse } from "../../interfaces/users.interfaces";

const listAllUsersService = async (): Promise<IDataUserResponse[]> => {

  const users = await usersRepository.find({ relations: { address: true } });
  return users;
  
};

export default listAllUsersService;
