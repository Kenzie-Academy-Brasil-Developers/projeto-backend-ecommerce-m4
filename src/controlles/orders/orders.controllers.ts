import { instanceToPlain } from 'class-transformer';
import { Request, Response } from "express";
import createOrderService from "../../services/orders/createOrder.service";
import { orderUpdatedService } from '../../services/orders/updateOrder.services';

export const createOrderController = async(req: Request, res: Response) => {
  const orders= await createOrderService(req.body, req.user.id);
 
  return res.status(200).json(instanceToPlain(orders));
};

export const updateOrderController = async(req: Request, res: Response) => {
  const orderId = +req.params.id
  const updateOrder = await orderUpdatedService(orderId)
  
  return res.status(200).json(updateOrder);
};


