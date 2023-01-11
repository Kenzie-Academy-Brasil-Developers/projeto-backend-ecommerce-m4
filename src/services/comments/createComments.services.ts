import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

export interface IComments {
  comments_text: string;
}

export interface IProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  avaible: boolean;
}

const createCommentsServices = async (
  idProducts: number,
  commentProduct: IComments
): Promise<IComments> => {
  const commentRepository = AppDataSource.getRepository(Comments);

  const idUser = "49907059-d98f-488c-b87d-f91b06296499";
  const comments = commentRepository.create({
    ...commentProduct,
    product: idProducts as any,
    user: idUser as any,
  });

  await commentRepository.save(comments);

  return comments;
};

export default createCommentsServices;
