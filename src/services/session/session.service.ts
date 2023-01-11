import { compare } from "bcryptjs";
import { jwt } from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";

export const sessionService = async ({ email, password }) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Email or password invalid");
  }

  const comparePass = await compare(password, user.password);

  if (!comparePass) {
    throw new AppError("Email or password invalid");
  }

  const token = jwt.sign(
    { isAdm: user.isAdm },
    process.env.SECRETKEY as string,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return { token: token };
};
