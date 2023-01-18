import { usersRepository } from "../../utils/repositories.ultil";
import { IDataUserResponse } from "../../interfaces/users.interfaces";

const listUserIDService = async (
  idUser: string
): Promise<IDataUserResponse> => {

  const users = await usersRepository.findOne({
    where: { id: idUser },
    relations: { address: true },
  });

  return users;
};

export default listUserIDService;
