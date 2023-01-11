import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

const deleteCommentsService = async (idComment: number): Promise<null> => {
  const commentsRepository = AppDataSource.getRepository(Comments);

  const comment = await commentsRepository.findOneBy({
    id: idComment,
  });

  await commentsRepository.softRemove(comment);

  return;
};

export default deleteCommentsService;
