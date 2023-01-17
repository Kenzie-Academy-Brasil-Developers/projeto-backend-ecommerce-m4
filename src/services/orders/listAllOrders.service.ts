import AppDataSource from "../../data-source"
import { Orders } from "../../entities/orders.entity"

const listAllOrdersService = async () => {

    const ordersRepository = AppDataSource.getRepository(Orders)

    const listOrders = await ordersRepository.find()

    return listOrders

}

export default listAllOrdersService