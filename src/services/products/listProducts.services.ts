import AppDataSource from "../../data-source";
import { Products } from "../../entities/products.entity";
import { IProductResponse } from "../../interfaces/products.interfaces";

const listProductsServices = async (): Promise<IProductResponse[]> => {
  const productRepository = AppDataSource.getRepository(Products);

  const products = productRepository.findBy({
    available: true,
  });

  return products;
};

export default listProductsServices;
