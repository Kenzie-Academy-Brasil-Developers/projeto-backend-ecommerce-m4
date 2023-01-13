import AppDataSource from "../../data-source";
import { Products } from "../../entities/products.entity";
import {
  IProductResponse,
  iProductUpdateRequest,
} from "../../interfaces/products.interfaces";

const updateProductService = async (
  idProduct: number,
  data: iProductUpdateRequest
): Promise<IProductResponse> => {
  const productRespository = AppDataSource.getRepository(Products);

  const product = await productRespository.findOneBy({ id: idProduct });

  await productRespository.update(idProduct, {
    ...product,
    ...data,
  });

  const productUpdated = await productRespository.findOneBy({ id: idProduct });

  return productUpdated;
};

export default updateProductService;
