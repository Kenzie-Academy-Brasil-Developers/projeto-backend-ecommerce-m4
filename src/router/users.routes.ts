import { Router } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controlles/users/user.controllers";

export const UserRouter = Router();

//Colocar as rotas abaixo
UserRouter.post("",createUserController)
UserRouter.get("",getAllUsersController)
UserRouter.get("/:id",getUserByIdController)
UserRouter.patch("/:id",updateUserController)
UserRouter.delete("/:id",deleteUserController)