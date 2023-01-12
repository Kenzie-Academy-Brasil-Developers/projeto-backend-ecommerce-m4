import AppDataSource from "../../data-source";
import { Orders } from "../../entities/orders.entity";
import { AppError } from "../../errors/errors";

export const orderUpdatedService = async (orderId: number) => {
  const ordersRepository = AppDataSource.getRepository(Orders);

  const order = await ordersRepository.findOneBy({ id: orderId });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  order.delivered = !order.delivered;

  const orderUpdated = await ordersRepository.save(order);

  return orderUpdated;
};