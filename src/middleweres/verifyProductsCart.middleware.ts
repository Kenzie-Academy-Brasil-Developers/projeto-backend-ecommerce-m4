import {Request,Response,NextFunction} from "express"
import AppDataSource from "../data-source"
import { Products } from "../entities/products.entity"

const verifyProductCartMiddleware =async(req:Request,res:Response,next:NextFunction)=>{
    const productsRepository = AppDataSource.getRepository(Products)
      
    req.body.map( async(product)=>{
      const findProduct = await productsRepository.findOneBy({id: product.product})
        if(!findProduct){
           return res.status(404).json({message:"Product not found"})
        }
    })

    next()

}

export default verifyProductCartMiddleware
