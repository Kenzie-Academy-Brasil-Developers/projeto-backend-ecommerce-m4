import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IOrderRequest } from "../../interfaces/orders.interfaces";
import orderUpdatedService from "../../services/orders/updateOrder.service";
import createOrderService from "../../services/orders/createOrder.service";
import listOrderProductServices from "../../services/orders/listOrderProduct.service";
import listAllOrdersService from "../../services/orders/listAllOrders.service";
import listProductsOrderUserService from "../../services/orders/listProductsOderUser.service";

const createOrderController = async (req: Request, res: Response) => {
  const id: string = req.user.id;
  const dataOrder: IOrderRequest[] = req.body;

  const orders = await createOrderService(dataOrder, id);

  return res.status(201).json(instanceToPlain(orders));
};

const listAllOrdersController = async (req: Request, res: Response) => {
  const orderList = await listAllOrdersService();

  return res.status(200).json(orderList);
};

const listProductsOrderUserController = async (req: Request, res: Response) => {
  const idUser = req.user.id;
  const listOrderProducts = await listProductsOrderUserService(idUser);

  return res.status(200).json(listOrderProducts);
};

const updateOrderController = async (req: Request, res: Response) => {
  const orderId: number = +req.params.id;
  const updateOrder = await orderUpdatedService(orderId);

  return res.status(200).json(updateOrder);
};

const listOrderProductController = async (req: Request, res: Response) => {
  const orderId: number = +req.params.id;
  const listOrder = await listOrderProductServices(orderId);

  return res.status(200).json(listOrder);
};

export {
  createOrderController,
  listAllOrdersController,
  listOrderProductController,
  updateOrderController,
  listProductsOrderUserController,
};
