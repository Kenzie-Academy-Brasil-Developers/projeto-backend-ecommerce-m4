import AppDataSource from "../data-source"
import { Products } from "../entities/products.entity"
import { AppError } from "../errors/errors"

export interface IproductRequest{
    name: string,
    description: string,
    price: number,
    amount: number,
    avaible: boolean
    
}


const createProductsServices = async (productData: IproductRequest) => {
    
    const productRepository = AppDataSource.getRepository(Products)

    const productExits = productRepository.findBy({
        name: productData.name
    })

    console.log(productExits)

    // if(productExits){
    //     throw new AppError('product already exist',400)
    // }

    const product = productRepository.create(productData)

    await productRepository.save(product)

    return product
    
}

export default createProductsServices