import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

const deleteCommentsService = async (idComment: number): Promise<void> => {
  const commentsRepository = AppDataSource.getRepository(Comments);

  const comment = await commentsRepository.findOneBy({
    id: idComment,
  });

  await commentsRepository.softRemove(comment);
};

export default deleteCommentsService;
