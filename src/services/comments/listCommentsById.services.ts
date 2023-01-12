import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { IComments } from "./createComments.services";

const listCommentsByIdServices = async (
  idProduct: number
): Promise<IComments[]> => {
  const commentsRepository = AppDataSource.getRepository(Comments);

  const comments = await commentsRepository.find({
    where: {
      id: idProduct,
    },
  });

  return comments;
};

export default listCommentsByIdServices;
