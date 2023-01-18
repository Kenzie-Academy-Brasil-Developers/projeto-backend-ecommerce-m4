import { productsRepository } from "../../utils/repositories.ultil";
import { AppError } from "../../errors/errors";
import {
  IProductRequest,
  IProductResponse,
} from "../../interfaces/products.interfaces";

const createProductsServices = async (
  productData: IProductRequest
): Promise<IProductResponse> => {
  
  const findProduct = await productsRepository.findOneBy({
    name: productData.name,
  });

  if (findProduct) {
    throw new AppError("Product already exists", 409);
  }

  const product = productsRepository.create(productData);

  await productsRepository.save(product);

  return product;
};

export default createProductsServices;
