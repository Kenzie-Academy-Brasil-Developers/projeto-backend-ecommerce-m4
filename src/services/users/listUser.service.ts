import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IDataUserResponse } from "./createUser.service";

const listUserIDService = async (
  idUser: string
): Promise<IDataUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOne({
    where: { id: idUser },
    relations: { address: true },
  });

  return users;
};

export default listUserIDService;
