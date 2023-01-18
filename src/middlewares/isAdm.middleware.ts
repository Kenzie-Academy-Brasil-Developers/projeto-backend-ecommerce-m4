import { NextFunction, Request, Response } from "express";

export const isAdmMiddlewere = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;

  if (!isAdm) {
    return res.status(403).json({ message: "You are not a admin" });
  }
  next();
};
