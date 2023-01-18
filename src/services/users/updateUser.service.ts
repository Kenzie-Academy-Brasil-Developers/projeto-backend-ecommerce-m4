import { hashSync } from "bcryptjs";
import { usersRepository } from "../../utils/repositories.ultil";
import { AppError } from "../../errors/errors";
import { IUpdateUserRequest } from "../../interfaces/users.interfaces";

const upadateUserService = async (
  userId: string,
  dataUser: IUpdateUserRequest
) => {
  
  const user = await usersRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found");
  }

  if (dataUser.email) {
    const findUser = await usersRepository.findOneBy({
      email: dataUser.email,
    });

    if (findUser && findUser.id !== user.id) {
      throw new AppError("User already exists", 409);
    }
  }

  const updatedUser = { ...user, ...dataUser };

  if (dataUser.password) updatedUser.password = hashSync(dataUser.password, 10);
  await usersRepository.save(updatedUser);

  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export default upadateUserService;
