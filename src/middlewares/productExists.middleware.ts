import { NextFunction, Response, Request } from "express";
import { Products } from "../entities/products.entity";
import AppDataSource from "../data-source";

export const productExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = Number(req.params.id)

  if(!productId) {
    return res.status(404).json({ message: "Product not found!"});
  }

  const productsRepository = AppDataSource.getRepository(Products);

  const productExists = await productsRepository.findOneBy({ id: productId });

  if (!productExists) {
    return res.status(404).json({ message: "Product not found!" });
  }

  next();
  
};
