import { NextFunction, Response, Request } from "express";
import {commentsRepository} from "../utils/repositories.ultil"

export const commentExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = Number(req.params.id);

  if (!commentId) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  const commentExists = await commentsRepository.findOneBy({ id: commentId });

  if (!commentExists) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  next();
};
