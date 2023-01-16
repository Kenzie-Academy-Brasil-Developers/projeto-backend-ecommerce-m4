import { Request, Response } from "express";
import createCommentsServices from "../../services/comments/createComments.services";
import updatedCommentsServices from "../../services/comments/updatedComments.services";
import deleteCommentsService from "../../services/comments/deleteComments.services";
import listCommentsByIdServices from "../../services/comments/listCommentsById.services";

export const createCommentsController = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const newComments = await createCommentsServices(id, req.body, req.user.id);
  return res.status(201).json(newComments);
};

export const updateCommentsController = async (req: Request, res: Response) => {
  const idComment = parseInt(req.params.id);

  const updatedComment = await updatedCommentsServices(idComment, req.body);

  return res.status(200).json(updatedComment);
};

export const deleteCommentsController = async (req: Request, res: Response) => {
  const idComment = parseInt(req.params.id);

  await deleteCommentsService(idComment);

  return res.status(204).json();
};

export const getCommentsByIdProductController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);

  const commentProduct = await listCommentsByIdServices(id);

  return res.status(200).json(commentProduct);
};
