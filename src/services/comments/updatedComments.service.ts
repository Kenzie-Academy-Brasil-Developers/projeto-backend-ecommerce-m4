import { AppError } from "../../errors/errors";
import {commentsRepository} from "../../utils/repositories.ultil"
import {
  ICommentsRequest,
  ICommentsResponse,
} from "../../interfaces/comments.interfaces";

const updatedCommentsServices = async (
  idComment: number,
  data: ICommentsRequest,
  idUser: string
): Promise<ICommentsResponse> => {
  
  const findUser = await commentsRepository.findOne({
    where: { id: idComment },
    relations: { user: true },
  });

  if (findUser.user.id !== idUser) {
    throw new AppError("You can't update other user's comments.", 403);
  }

  const comment = await commentsRepository.findOneBy({
    id: idComment,
  });

  await commentsRepository.update(idComment, {
    ...comment,
    comments_text: data.comments_text,
  });

  const commentUpdated = await commentsRepository.findOneBy({ id: idComment });

  return commentUpdated;
};

export default updatedCommentsServices;
