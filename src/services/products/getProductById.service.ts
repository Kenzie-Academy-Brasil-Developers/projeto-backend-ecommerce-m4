import { productsRepository } from '../../utils/repositories.ultil';
import {IProductResponse} from '../../interfaces/products.interfaces'

const getProductByIdService = async (id:number):Promise<IProductResponse> =>{
    const product = await productsRepository.findOneBy({id:id});
    return product;
}

export default getProductByIdService;
