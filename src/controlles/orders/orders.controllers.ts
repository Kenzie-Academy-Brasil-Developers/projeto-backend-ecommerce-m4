import { Request, Response } from "express";
import createOrderService from "../../services/orders/createOrder.service";

export const createOrderController = async(req: Request, res: Response) => {
  const orders= await createOrderService(req.body);

  return res.status(200).json(orders);
};

export const updateOrderController = async(req: Request, res: Response) => {
  return res.status(200).json({});
};

export const deleteOrderController = async(req: Request, res: Response) => {
  return res.status(200).json({});
};
