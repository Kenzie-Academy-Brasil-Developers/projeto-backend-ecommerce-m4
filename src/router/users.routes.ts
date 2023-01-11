import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controlles/users/user.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";
import { isAdmMiddlewere } from "../middleweres/isAdm.Middlewere";
import { userExistsMiddlewere } from "../middleweres/userExists.middlewere";
import { validateUserPermissionsMiddlewere } from "../middleweres/validateUserPermissions.middlewere";

export const UserRouter = Router();

UserRouter.post("", createUserController);

UserRouter.get("", authTokenMiddleware, isAdmMiddlewere, getAllUsersController);

UserRouter.get(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  getUserByIdController
);

UserRouter.patch(
  "/:id",
  authTokenMiddleware,
  isAdmMiddlewere,
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  updateUserController
);

UserRouter.delete(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  deleteUserController
);
