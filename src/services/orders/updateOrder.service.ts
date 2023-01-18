import { ordersRepository } from "../../utils/repositories.ultil";
import { AppError } from "../../errors/errors";
import { IOrderResponse } from "../../interfaces/orders.interfaces";

const orderUpdatedService = async (
  orderId: number
): Promise<IOrderResponse> => {
  
  const order = await ordersRepository.findOneBy({ id: orderId });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  order.delivered = !order.delivered;

  const orderUpdated = await ordersRepository.save(order);

  return orderUpdated;
};

export default orderUpdatedService
