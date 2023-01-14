import { Request, Response } from "express";
import { sessionService } from "../../services/session/session.service";
import { ISessionRequest } from "../../interfaces/session.interfaces";

export const sessionController = async (req: Request, res: Response) => {
  const dataSession: ISessionRequest = req.body;
  const session = await sessionService(dataSession);

  return res.status(200).json(session);
};
