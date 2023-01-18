import { productsRepository } from "../../utils/repositories.ultil";
import { IProductResponse } from "../../interfaces/products.interfaces";

const listProductsServices = async (): Promise<IProductResponse[]> => {

  const products = await  productsRepository.createQueryBuilder('products')
  .where('products.amount != 0')
  .andWhere('products.available = true')
  .getMany()

  return products;
};

export default listProductsServices;
