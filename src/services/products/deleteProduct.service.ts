import { productsRepository } from "../../utils/repositories.ultil";

const deleteProductService = async (idProduct: number): Promise<void> => {

  const product = await productsRepository.findOneBy({ id: idProduct });

  const returned = await productsRepository.update(idProduct, { ...product, available: false });

  const product2 = await productsRepository.findOneBy({ id: idProduct });

};

export default deleteProductService
