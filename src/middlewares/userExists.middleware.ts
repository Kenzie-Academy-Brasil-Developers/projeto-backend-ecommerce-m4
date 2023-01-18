import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";

export const userExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  const userRepository = AppDataSource.getRepository(User);

  const userExists = await userRepository.findOneBy({ id: userId });

  if (!userExists) {
    return res.status(404).json({ message: "User not found." });
  }

  next();
};
