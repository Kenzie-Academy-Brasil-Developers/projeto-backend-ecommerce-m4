import { Request, Response, NextFunction } from "express";
import {productsRepository} from "../utils/repositories.ultil"

const verifyProductCartMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  for (let i = 0; i < req.body.length; i++) {
    const order = await productsRepository.findOneBy({
      id: req.body[i].product,
    });

    if (!order) {
      return res.status(404).json({ message: "Product doesn't exists" });
    }
 
    const product = await productsRepository.findOneBy(req.body[i].product)
  
    if(product.amount < req.body[i].amount || product.amount === 0){
      return res.status(400).json({message: `the product ${product.name} is not available. the product's stock is ${product.amount}`})
    }

  }

  next();
};

export default verifyProductCartMiddleware;
