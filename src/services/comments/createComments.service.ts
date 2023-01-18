import {
  commentsRepository,
  productsRepository,
  usersRepository,
} from "../../utils/repositories.ultil";
import {
  ICommentsRequest,
  ICommentsResponse,
} from "../../interfaces/comments.interfaces";

const createCommentsServices = async (
  idProducts: number,
  commentProduct: ICommentsRequest,
  userId: string
): Promise<ICommentsResponse> => {
  
  const user = await usersRepository.findOneBy({ id: userId });
  const products = await productsRepository.findOneBy({ id: idProducts });

  const comments = commentsRepository.create({
    ...commentProduct,
    product: products,
    user: user,
  });

  const newComments = await commentsRepository.save(comments);

  return newComments;
};

export default createCommentsServices;
