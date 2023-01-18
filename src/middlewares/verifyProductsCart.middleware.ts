import { Request, Response, NextFunction } from "express";
import { Products } from "../entities/products.entity";
import AppDataSource from "../data-source";

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

    const product = await productsRepository.findOneBy(req.body[i].product);

    if (product.stock < req.body[i].amount || !product.available) {
      return res.status(409).json({
        message: `the product ${product.name} is not available. the product's stock is ${product.stock}`,
      });
    }
  }

  next();
};

export default verifyProductCartMiddleware;
