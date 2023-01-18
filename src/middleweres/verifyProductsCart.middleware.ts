import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Products } from "../entities/products.entity";
import { AppError } from "../errors/errors";

const verifyProductCartMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productsRepository = AppDataSource.getRepository(Products);
  

  for (let i = 0; i < req.body.length; i++) {
    const order = await productsRepository.findOneBy({
      id: req.body[i].product,
    });

    if (!order) {
      return res.status(404).json({ message: "Product doesn't exists" });
    }
 
    const product = await productsRepository.findOneBy(req.body[i].product)
  
    if(product.amount < req.body[i].amount){
      return res.status(400).json({message: `tha product ${product.name} is not avaliable amount. the product's stock is ${product.amount}`})
    }

  }

  next();
};

export default verifyProductCartMiddleware;
