import AppDataSource from '../../data-source';
import { Products } from '../../entities/products.entity';
import {IProductResponse} from '../../interfaces/products.interfaces'
const getProductByIdService = async (id:number):Promise<IProductResponse> =>{

    const productsRepository = AppDataSource.getRepository(Products);
    const product = await productsRepository.findOneBy({id:id});
    return product;
}


export default getProductByIdService;
