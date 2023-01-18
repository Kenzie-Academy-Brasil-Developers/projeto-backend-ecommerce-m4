import { productsRepository } from "../../utils/repositories.ultil";

const deleteProductService = async (idProduct: number): Promise<void> => {
  const product = await productsRepository.findOneBy({ id: idProduct });

  await productsRepository.update(idProduct, { ...product, available: false });

  await productsRepository.findOneBy({ id: idProduct });
};

export default deleteProductService;
