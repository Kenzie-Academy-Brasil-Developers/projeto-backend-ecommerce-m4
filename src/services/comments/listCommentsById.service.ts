import { productsRepository} from "../../utils/repositories.ultil"

const listCommentsByIdServices = async (idProduct: number) => {
  
  const product = await productsRepository.findOne({
    where: {
      id: idProduct,
    },
    relations: {
      comments: true,
    },
  });

  return product;
};

export default listCommentsByIdServices;
