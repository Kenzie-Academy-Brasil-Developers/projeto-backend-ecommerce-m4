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
import validatedBodyMiddleware from "../middleweres/validatedData.middleware";
import { userRequestSchema, userUpdateRequestSchema } from "../schemas/users/users.schemas";
export const UserRouter = Router();

UserRouter.post("",validatedBodyMiddleware(userRequestSchema),createUserController);

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
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  validatedBodyMiddleware(userUpdateRequestSchema),
  updateUserController
);

UserRouter.delete(
  "/:id",
  authTokenMiddleware,
  userExistsMiddlewere,
  validateUserPermissionsMiddlewere,
  deleteUserController
);
