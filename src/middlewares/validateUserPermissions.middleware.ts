import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

export const validateUserPermissionsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSession = req.user;

  if (!userSession.isAdm && req.params.id !== userSession.id) {
    throw new AppError("You are not able to do this action", 403);
  }

  next();
};
