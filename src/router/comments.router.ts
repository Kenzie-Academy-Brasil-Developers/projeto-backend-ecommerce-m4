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
import {commentsRequestSchema} from "../schemas/comments/comments.schemas"

export const commentsRouter = Router();

commentsRouter.post(
  "/:id/comments",
  authTokenMiddleware,
  validatedBodyMiddleware(commentsRequestSchema),
  createCommentsController
);
commentsRouter.get(
  "/:id/comments",
  commentExistsMiddlewere,
  authTokenMiddleware,
  getCommentsByIdProductController
);
commentsRouter.patch(
  "/comments/:id",
  commentExistsMiddlewere,
  authTokenMiddleware,
  validateUserPermissionsMiddlewere,
  validatedBodyMiddleware(commentsRequestSchema),
  updateCommentsController
);
commentsRouter.delete(
  "/comments/:id",
  commentExistsMiddlewere,
  authTokenMiddleware,
  validateUserPermissionsMiddlewere,
  deleteCommentsController
);
