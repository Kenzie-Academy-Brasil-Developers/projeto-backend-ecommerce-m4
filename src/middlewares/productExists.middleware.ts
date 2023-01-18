import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/errors";
import { productsRepository } from "../utils/repositories.ultil";

export const productExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = Number(req.params.id);

  if (!productId) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const productExists = await productsRepository.findOneBy({ id: productId });

  if (!productExists) {
    return res.status(404).json({ message: "Product not found!" });
  }

  next();
};
