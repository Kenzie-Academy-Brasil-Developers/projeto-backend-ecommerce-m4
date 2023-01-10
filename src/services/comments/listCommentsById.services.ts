import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

const listCommentsByIdServices = async (idProduct) => {
  const commentsRepository = AppDataSource.getRepository(Comments);

  const comments = await commentsRepository.find({
    where: {
      id: idProduct,
    },
  });

  return comments;
};

export default listCommentsByIdServices;
