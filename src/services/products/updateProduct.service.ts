import { productsRepository } from "../../utils/repositories.ultil";
import { AppError } from "../../errors/errors";
import {
  IProductResponse,
  iProductUpdateRequest,
} from "../../interfaces/products.interfaces";

const updateProductService = async (
  idProduct: number,
  data: iProductUpdateRequest
): Promise<IProductResponse> => {
  const product = await productsRepository.findOneBy({ id: idProduct });

  if (data.name) {
    const findProduct = await productsRepository.findOneBy({
      name: data.name,
    });
    if (findProduct && findProduct.id !== product.id) {
      throw new AppError("Product already exists", 409);
    }
  }

  await productsRepository.update(idProduct, {
    ...product,
    ...data,
  });

  const productUpdated = await productsRepository.findOneBy({ id: idProduct });
  productUpdated.price = +productUpdated.price;

  return productUpdated;
};

export default updateProductService;
