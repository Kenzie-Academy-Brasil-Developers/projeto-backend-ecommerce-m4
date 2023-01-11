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

export const UserRouter = Router();

UserRouter.post("", createUserController);

UserRouter.get("", authTokenMiddleware, isAdmMiddlewere, getAllUsersController);

UserRouter.get(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  getUserByIdController
);

UserRouter.patch(
  "/:id",
  authTokenMiddleware,
  isAdmMiddlewere,
  userExistsMiddlewere,
  updateUserController
);

UserRouter.delete(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  deleteUserController
);
