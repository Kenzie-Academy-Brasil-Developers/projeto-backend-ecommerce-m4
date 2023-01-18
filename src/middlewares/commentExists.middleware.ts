import { NextFunction, Response, Request } from "express";
import { Comments } from "../entities/comments.entity";
import AppDataSource from "../data-source";

export const commentExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = Number(req.params.id);

  if (!commentId) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  const commentsRepository = AppDataSource.getRepository(Comments);

  const commentExists = await commentsRepository.findOneBy({ id: commentId });

  if (!commentExists) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  next();
};