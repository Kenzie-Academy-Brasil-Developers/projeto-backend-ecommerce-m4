import AppDataSource from "../../data-source"
import { Products } from "../../entities/products.entity"


const listProductsServices = async () => {

    const productRepository = AppDataSource.getRepository(Products)

    const products = productRepository.findBy({
        available: true
    })

    return products
}

export default listProductsServices