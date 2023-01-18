import { Request, Response } from "express";
import createCommentsServices from "../../services/comments/createComments.service";
import updatedCommentsServices from "../../services/comments/updatedComments.service";
import deleteCommentsService from "../../services/comments/deleteComments.service";
import listCommentsByIdServices from "../../services/comments/listCommentsById.service";

const createCommentsController = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const newComments = await createCommentsServices(id, req.body, req.user.id);
  return res.status(201).json(newComments);
};

const updateCommentsController = async (req: Request, res: Response) => {
  const idComment = parseInt(req.params.id);

  const updatedComment = await updatedCommentsServices(
    idComment,
    req.body,
    req.user.id
  );

  return res.status(200).json(updatedComment);
};

const deleteCommentsController = async (req: Request, res: Response) => {
  const idComment = parseInt(req.params.id);

  await deleteCommentsService(idComment, req.user);

  return res.status(204).json();
};

const getCommentsByIdProductController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);

  const commentProduct = await listCommentsByIdServices(id);

  return res.status(200).json(commentProduct);
};

export {
  createCommentsController,
  deleteCommentsController,
  getCommentsByIdProductController,
  updateCommentsController,
};
