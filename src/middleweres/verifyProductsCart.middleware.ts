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
  }

  next();
};

export default verifyProductCartMiddleware;
