import { compare } from "bcryptjs";
import { usersRepository } from "../../utils/repositories.ultil";
import { AppError } from "../../errors/errors";
import {
  ISessionRequest,
  ISessionResponse,
} from "../../interfaces/session.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";

const sessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<ISessionResponse> => {
  
  const user = await usersRepository.findOneBy({ email: email });

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