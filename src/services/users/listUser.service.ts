import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUserIDService = async (idUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOne({
    where: { id: idUser },
    relations: { address: true },
  });

  return users;
};

export default listUserIDService;
