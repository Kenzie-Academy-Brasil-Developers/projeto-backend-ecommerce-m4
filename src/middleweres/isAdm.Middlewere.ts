import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

export const isAdmMiddlewere = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  const token = authToken!.split(" ")[1];

  return jwt.verify(
    token as string,
    process.env.SECRETKEY,
    async (error, decoded: any) => {
      if (error) {
        return res.send(error.message);
      }

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({ id: decoded.sub });

      if (!user?.isAdm) {
        return res.status(403).json({ message: "Need admin permission" });
      }

      next();
    }
  );
};
