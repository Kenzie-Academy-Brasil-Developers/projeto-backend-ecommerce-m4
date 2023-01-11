import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { IComments } from "./createComments.services";

const updatedCommentsServices = async (
  idProduct,
  idComment: number,
  dataComment: string
): Promise<IComments> => {
  const commentRepository = AppDataSource.getRepository(Comments);

  const comment = await commentRepository.findOneBy({
    id: idComment,
  });

  await commentRepository.update(idComment, {
    ...comment,
    comments_text: dataComment,
  });

  return comment;
};

export default updatedCommentsServices;
