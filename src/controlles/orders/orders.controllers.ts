import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createOrderService from "../../services/orders/createOrder.service";
import { orderUpdatedService } from "../../services/orders/updateOrder.services";
import listOrderProductServices from "../../services/orders/listOrderProduct.services";
import { IOrderRequest } from "../../interfaces/orders.interfaces";

export const createOrderController = async (req: Request, res: Response) => {
  const id: string = req.user.id;
  const dataOrder: IOrderRequest[] = req.body;
  const orders = await createOrderService(dataOrder, id);

  return res.status(201).json(instanceToPlain(orders));
};

export const updateOrderController = async (req: Request, res: Response) => {
  const orderId: number = +req.params.id;
  const updateOrder = await orderUpdatedService(orderId);

  return res.status(200).json(updateOrder);
};

export const listOrderProductController = async (
  req: Request,
  res: Response
) => {
  const orderId: number = +req.params.id;
  const listOrder = await listOrderProductServices(orderId);

  return res.status(200).json(listOrder);
};
