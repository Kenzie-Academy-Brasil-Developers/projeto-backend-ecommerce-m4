import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { AppError } from "../../errors/errors";
import {
  ICommentsRequest,
  ICommentsResponse,
} from "../../interfaces/comments.interfaces";

const updatedCommentsServices = async (
  idComment: number,
  data: ICommentsRequest,
  idUser: string
): Promise<ICommentsResponse> => {
  const commentRepository = AppDataSource.getRepository(Comments);

  const findUser = await commentRepository.findOne({
    where: { id: idComment },
    relations: { user: true },
  });

  if (findUser.user.id !== idUser) {
    throw new AppError("You can't update other user's comments.", 403);
  }

  const comment = await commentRepository.findOneBy({
    id: idComment,
  });

  await commentRepository.update(idComment, {
    ...comment,
    comments_text: data.comments_text,
  });

  const commentUpdated = await commentRepository.findOneBy({ id: idComment });

  return commentUpdated;
};

export default updatedCommentsServices;
