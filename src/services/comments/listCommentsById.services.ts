import { Products } from './../../entities/products.entity';
import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

const listCommentsByIdServices = async (
  idProduct: number
)=> {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const productsRepository = AppDataSource.getRepository(Products);

  const product = await productsRepository.find({
    where:{
      id: idProduct
    },
    relations:{
      comments: true
    }
  })


  return product;
};

export default listCommentsByIdServices;
