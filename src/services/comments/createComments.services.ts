import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

const createCommentsServices = async (idProducts, commentProduct) => {
  const commentRepository = AppDataSource.getRepository(Comments);

  const idUser = "49907059-d98f-488c-b87d-f91b06296499";
  const comments = commentRepository.create({
    ...commentProduct,
    product: idProducts,
    user: idUser,
  });

  await commentRepository.save(comments);

  return comments;
};

export default createCommentsServices;
