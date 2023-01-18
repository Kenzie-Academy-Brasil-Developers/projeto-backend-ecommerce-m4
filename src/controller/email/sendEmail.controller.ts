import { Request, Response } from "express";

export const sendEmailController = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Email send with success" });
};
