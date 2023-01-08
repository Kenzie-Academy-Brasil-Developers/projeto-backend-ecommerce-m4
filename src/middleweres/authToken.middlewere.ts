import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ message: "Missing authorization headers" });
  }

  const token = authToken?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (error, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
        });
      }

      req.user = {
        id: decoded.sub as string,
      };

      return next();
    }
  );
};
