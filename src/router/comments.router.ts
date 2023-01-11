import { Router } from "express";
import {
  createCommentsController,
  deleteCommentsController,
  updateCommentsController,
  getCommentsByIdProductController,
} from "../controlles/comments/comments.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";
import { validateUserPermissionsMiddlewere } from "../middleweres/validateUserPermissions.middlewere";

export const commentsRouter = Router();

commentsRouter.post(
  "/:id/comments",
  authTokenMiddleware,
  createCommentsController
);
commentsRouter.get(
  "/comments",
  authTokenMiddleware,
  getCommentsByIdProductController
);
commentsRouter.patch(
  "/comments/:id",
  authTokenMiddleware,
  validateUserPermissionsMiddlewere,
  updateCommentsController
);
commentsRouter.delete(
  "/comments/:id",
  authTokenMiddleware,
  validateUserPermissionsMiddlewere,
  deleteCommentsController
);
