import AppDataSource from "../../data-source";
import { Products } from "../../entities/products.entity";
import { AppError } from "../../errors/errors";
import {
  IProductRequest,
  IProductResponse,
} from "../../interfaces/products.interfaces";

const createProductsServices = async (
  productData: IProductRequest
): Promise<IProductResponse> => {
  const productRepository = AppDataSource.getRepository(Products);

  const findProduct = await productRepository.findOneBy({
    name: productData.name,
  });

  if (findProduct) {
    throw new AppError("Product already exists", 409);
  }

  const product = productRepository.create(productData);

  await productRepository.save(product);

  return product;
};

export default createProductsServices;
