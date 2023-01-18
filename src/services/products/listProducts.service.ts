import { productsRepository } from "../../utils/repositories.ultil";
import { IProductResponse } from "../../interfaces/products.interfaces";

const listProductsServices = async (): Promise<IProductResponse[]> => {
  const products = await productsRepository
    .createQueryBuilder("products")
    .where("products.stock != 0")
    .andWhere("products.available = true")
    .getMany();

  products.forEach((product) => {
    product.price = +product.price;
  });
  return products;
};

export default listProductsServices;
