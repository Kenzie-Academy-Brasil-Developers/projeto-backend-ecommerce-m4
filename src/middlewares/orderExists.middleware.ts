import { NextFunction, Response, Request } from "express";
import {ordersRepository} from "../utils/repositories.ultil"

export const orderExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = Number(req.params.id)

  if(!orderId) {
    return res.status(404).json({ message: "Order not found!"});
  }

  const orderExists = await ordersRepository.findOneBy({ id: orderId });

  if (!orderExists) {
    return res.status(404).json({ message: "Order not found!" });
  }

  next();
  
};