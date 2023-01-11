import { Router } from "express";
import {
  createCommentsController,
  deleteCommentsController,
  updateCommentsController,
  getCommentsByIdProductController,
} from "../controlles/comments/comments.controllers";

export const commentsRouter = Router();

commentsRouter.post("/:id/comments", createCommentsController);
commentsRouter.get("/:id/comments", getCommentsByIdProductController);
commentsRouter.patch("/:id/comments/:idComment", updateCommentsController);
commentsRouter.delete("/:id/comments/:idComment", deleteCommentsController);
