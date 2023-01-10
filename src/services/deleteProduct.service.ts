import AppDataSource from "../data-source"
import { Products } from "../entities/products.entity"

export const deleteProductService = async (idProduct: number): Promise<void> => {

    const productRespository = AppDataSource.getRepository(Products)

    const product  = await productRespository.findOneBy({id: idProduct})

    await productRespository.update(idProduct, {...product, available: false})

}