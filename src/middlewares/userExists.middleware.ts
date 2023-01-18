import { NextFunction, Request, Response } from "express";
import { usersRepository } from "../utils/repositories.ultil";
import { validate } from "uuid";

export const userExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const isUuidValid = validate(userId);
  if (!isUuidValid) {
    return res.status(404).json({ message: "User not found." });
  }
  const userExists = await usersRepository.findOneBy({ id: userId });

  if (!userExists) {
    return res.status(404).json({ message: "User not found." });
  }

  next();
};
