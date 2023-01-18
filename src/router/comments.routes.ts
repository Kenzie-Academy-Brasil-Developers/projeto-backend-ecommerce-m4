import { Router                  } from "express";
import { authTokenMiddleware     } from "../middleweres/authToken.middlewere";
import { commentExistsMiddlewere } from "../middleweres/commentExists.middlewere";
import { commentsRequestSchema   } from "../schemas/comments/comments.schemas";
import { productExistsMiddlewere } from "../middleweres/productExists.middlewere";
import validatedBodyMiddleware     from "../middleweres/validatedData.middleware";
import {
  createCommentsController,
  deleteCommentsController,
  updateCommentsController,
  getCommentsByIdProductController,
} from "../controller/comments/comments.controllers";

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
