import { Router } from "express";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { commentExistsMiddlewere } from "../middlewares/commentExists.middleware";
import { commentsRequestSchema } from "../schemas/comments/comments.schemas";
import { productExistsMiddlewere } from "../middlewares/productExists.middleware";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";
import {
  createCommentsController,
  deleteCommentsController,
  updateCommentsController,
  getCommentsByIdProductController,
} from "../controllers/comments/comments.controllers";

export const commentsRouter = Router();

commentsRouter.post(
  "/:id/comments",
  authTokenMiddleware,
  productExistsMiddlewere,
  validatedBodyMiddleware(commentsRequestSchema),
  createCommentsController
);
commentsRouter.get(
  "/:id/comments",
  productExistsMiddlewere,
  getCommentsByIdProductController
);
commentsRouter.patch(
  "/comments/:id",
  authTokenMiddleware,
  commentExistsMiddlewere,
  validatedBodyMiddleware(commentsRequestSchema),
  updateCommentsController
);
commentsRouter.delete(
  "/comments/:id",
  authTokenMiddleware,
  commentExistsMiddlewere,
  deleteCommentsController
);
