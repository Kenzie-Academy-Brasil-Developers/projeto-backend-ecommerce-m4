import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/errors";
import { productsRepository } from "../utils/repositories.ultil";

export const productIsAvailableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = Number(req.params.id);

  if (!productId) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const product = await productsRepository
    .createQueryBuilder("products")
    .where("products.available = true")
    .andWhere("products.id = :idProduct", { idProduct: productId })
    .getOne();

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  next();
};
