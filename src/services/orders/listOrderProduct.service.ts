import { Orders } from "../../entities/orders.entity";
import { IOrderResponse } from "../../interfaces/orders.interfaces";
import { AppDataSource } from "../../__tests__/integration";
import {ordersRepository} from "../../utils/repositories.ultil"

const listOrderProductByIdServices = async (
  idOrder: number
): Promise<IOrderResponse> => {
 
  const order = await ordersRepository
    .createQueryBuilder("orders")
    .innerJoinAndSelect("orders.ordersProducts", "ordersProduct")
    .innerJoinAndSelect("ordersProduct.product", "product")
    .where("orders.id = :id", { id: idOrder })
    .getOne();

  return order;
};

export default listOrderProductByIdServices;
