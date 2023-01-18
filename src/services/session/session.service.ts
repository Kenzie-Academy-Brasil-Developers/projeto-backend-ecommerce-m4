import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import "dotenv/config";
import {
  ISessionRequest,
  ISessionResponse,
} from "../../interfaces/session.interfaces";

const sessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<ISessionResponse> => {
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

export default sessionService