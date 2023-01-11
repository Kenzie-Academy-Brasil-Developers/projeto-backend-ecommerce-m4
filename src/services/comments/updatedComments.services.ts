import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { IComments } from "./createComments.services";

const updatedCommentsServices = async (
  idComment: number,
  { comment_text }
): Promise<IComments> => {
  const commentRepository = AppDataSource.getRepository(Comments);

  const comment = await commentRepository.findOneBy({
    id: idComment,
  });

  await commentRepository.update(idComment, {
    ...comment,
    comments_text: comment_text,
  });

  const commentUpdated = await commentRepository.findOneBy({ id: idComment });

  return commentUpdated;
};

export default updatedCommentsServices;
