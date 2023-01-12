import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { Products } from "../../entities/products.entity";
import { User } from "../../entities/user.entity";

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
  commentProduct: IComments,
  userId: string
): Promise<IComments> => {
  const commentRepository = AppDataSource.getRepository(Comments);
  const userRepository = AppDataSource.getRepository(User);
  const productsRepository = AppDataSource.getRepository(Products);

  const user = await userRepository.findOneBy({ id: userId });
  const products = await productsRepository.findOneBy({ id: idProducts });

  const comments = commentRepository.create({
    ...commentProduct,
    product: products,
    user: user,
  });

  const newComments = await commentRepository.save(comments);

  return newComments;
};

export default createCommentsServices;
