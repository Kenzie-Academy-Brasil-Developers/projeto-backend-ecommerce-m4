import AppDataSource from "../../data-source";
import { Products } from "../../entities/products.entity";
import { IProductResponse } from "../../interfaces/products.interfaces";

const listProductsServices = async (): Promise<IProductResponse[]> => {
  const productRepository = AppDataSource.getRepository(Products);

  const products = await productRepository.createQueryBuilder('products')
  .where('products.amount >= 0')
  .andWhere('products.available = true')
  .getMany()

  return products;
};

export default listProductsServices;
