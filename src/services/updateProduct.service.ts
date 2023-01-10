import AppDataSource from "../data-source"
import { Products } from "../entities/products.entity"
import { AppError } from "../errors/errors"

interface iProduct {
    "id": number,
    "name": string,
    "description": string,
    "price": number,
    "amount": number,
    "available": boolean
}

interface iProductUpdateRequest{
    "name"?: string,
    "description"?: string,
    "price"?: number,
    "amount"?: number,
    "avaible"?: boolean
}
  
export const updateProductService = async (idProduct: number, data: iProductUpdateRequest): Promise<iProduct> => {

    const productRespository = AppDataSource.getRepository(Products)

    const product = await productRespository.findOneBy({id: idProduct})

    await productRespository.update(idProduct, {
        ...product,
        ...data
    })

    return product

}

