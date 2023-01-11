import { Request, Response } from "express";
import { sessionService } from "../../services/session/session.service";

export const sessionController = (req: Request, res: Response) => {
  const session = sessionService(req.body);

  return res.status(200).json(session);
};
