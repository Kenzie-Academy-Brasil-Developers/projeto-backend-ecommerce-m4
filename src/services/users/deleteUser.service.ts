import { usersRepository } from "../../utils/repositories.ultil";

const deleteUserService = async (userToDelete: string): Promise<void> => {
  const user = await usersRepository.findOneBy({ id: userToDelete });

  await usersRepository.softRemove(user);
  usersRepository.save(user);
};

export default deleteUserService;
