import { Router } from "express";
import {
  createCommentsController,
  deleteCommentsController,
  updateCommentsController,
  getCommentsByIdProductController,
} from "../controlles/comments/comments.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";
import { commentExistsMiddlewere } from "../middleweres/commentExists.middlewere";
import { validateUserPermissionsMiddlewere } from "../middleweres/validateUserPermissions.middlewere";
import validatedBodyMiddleware from "../middleweres/validatedData.middleware";
import { commentsRequestSchema } from "../schemas/comments/comments.schemas";
import { productExistsMiddlewere } from "../middleweres/productExists.middlewere";

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
  validateUserPermissionsMiddlewere,
  validatedBodyMiddleware(commentsRequestSchema),
  updateCommentsController
);
commentsRouter.delete(
  "/comments/:id",
  authTokenMiddleware,
  commentExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  deleteCommentsController
);
