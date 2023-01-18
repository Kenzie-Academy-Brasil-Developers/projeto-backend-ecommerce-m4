import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IDataUserRequest } from "../../interfaces/users.interface";
import createUserService from "../../services/users/createUser.service";
import deleteUserService from "../../services/users/deleteUser.service";
import listAllUsersService from "../../services/users/listAllUsers.service";
import listUserIDService from "../../services/users/listUser.service";
import upadateUserService from "../../services/users/updateUserservice";

export const createUserController = async (req: Request, res: Response) => {
  const dataUser: IDataUserRequest = req.body;
  const user = await createUserService(dataUser);
  return res.status(201).json(instanceToPlain(user));
};

export const updateUserController = async (req: Request, res: Response) => {
  const dataUser: IDataUserRequest = req.body;
  const id: string = req.params.id;
  const user = await upadateUserService(id, dataUser);
  return res.status(200).json(instanceToPlain(user));
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteUserService(id);
  return res.status(204).json();
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.status(200).json(instanceToPlain(users));
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = await listUserIDService(id);
  return res.status(200).json(instanceToPlain(user));
};
