import { NextFunction, Response, Request } from "express";
import AppDataSource from "../data-source";
import { Orders } from "../entities/orders.entity";

export const orderExistsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = Number(req.params.id)

  if(!orderId) {
    return res.status(404).json({ message: "Order not found!"});
  }

  const ordersRepository = AppDataSource.getRepository(Orders);

  const orderExists = await ordersRepository.findOneBy({ id: orderId });

  if (!orderExists) {
    return res.status(404).json({ message: "Order not found!" });
  }

  next();
  
};