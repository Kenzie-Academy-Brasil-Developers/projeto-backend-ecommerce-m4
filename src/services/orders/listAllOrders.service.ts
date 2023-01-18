import { ordersRepository } from "../../utils/repositories.ultil"

const listAllOrdersService = async () => {

    const listOrders = await ordersRepository.find()

    return listOrders

}

export default listAllOrdersService