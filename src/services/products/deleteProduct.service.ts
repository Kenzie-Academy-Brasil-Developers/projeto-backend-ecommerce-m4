import AppDataSource from "../../data-source";
import { Products } from "../../entities/products.entity";

const deleteProductService = async (idProduct: number): Promise<void> => {

  const productRespository = AppDataSource.getRepository(Products);

  const product = await productRespository.findOneBy({ id: idProduct });

  const returned = await productRespository.update(idProduct, { ...product, available: false });

  const product2 = await productRespository.findOneBy({ id: idProduct });

};

export default deleteProductService
