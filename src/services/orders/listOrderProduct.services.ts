import { Orders } from "../../entities/orders.entity"
import { OrdersProducts } from "../../entities/ordersProducts.entity"
import { AppDataSource } from "../../__tests__/integration"


const listOrderProductServices = async(idOrder: number) => {

    const orderRepository = AppDataSource.getRepository(Orders)

    const order = await orderRepository.createQueryBuilder('orders')
    .innerJoinAndSelect('orders.ordersProducts', 'ordersProduct')
    .innerJoinAndSelect('ordersProduct.product', 'product')
    .where('orders.id = :id', {id:idOrder})
    .getMany()

    return order;
}

export default listOrderProductServices