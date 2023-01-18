import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/users/user.controllers";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddlewere } from "../middlewares/isAdm.middleware";
import { userExistsMiddlewere } from "../middlewares/userExists.middleware";
import { validateUserPermissionsMiddlewere } from "../middlewares/validateUserPermissions.middleware";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";
import {
  userRequestSchema,
  userUpdateRequestSchema,
} from "../schemas/users/users.schemas";

const UserRouter = Router();

UserRouter.post(
  "",
  validatedBodyMiddleware(userRequestSchema),
  createUserController
);

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

export default UserRouter