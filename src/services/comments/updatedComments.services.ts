import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { ICommentsResponse } from "../../interfaces/comments.interfaces";

const updatedCommentsServices = async (
  idComment: number,
  data
): Promise<ICommentsResponse> => {
  const commentRepository = AppDataSource.getRepository(Comments);

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
