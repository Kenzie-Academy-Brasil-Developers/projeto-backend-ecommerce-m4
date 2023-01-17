import AppDataSource from "../../data-source";
import { Products } from "../../entities/products.entity";
import { AppError } from "../../errors/errors";
import {
  IProductResponse,
  iProductUpdateRequest,
} from "../../interfaces/products.interfaces";

const updateProductService = async (
  idProduct: number,
  data: iProductUpdateRequest
): Promise<IProductResponse> => {
  const productRepository = AppDataSource.getRepository(Products);

  const product = await productRepository.findOneBy({ id: idProduct });

  const findProduct = await productRepository.findOneBy({
    name: data.name,
  });

  if (findProduct) {
    throw new AppError("Product already exists", 409);
  }

  await productRepository.update(idProduct, {
    ...product,
    ...data,
  });

  const productUpdated = await productRepository.findOneBy({ id: idProduct });

  return productUpdated;
};

export default updateProductService;
