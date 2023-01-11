import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

const updatedCommentsServices = async (idProduct, idComment, dataComment) => {
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
