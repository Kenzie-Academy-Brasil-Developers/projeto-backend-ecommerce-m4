import AppDataSource from "../../data-source"
import { Orders } from "../../entities/orders.entity";

const listProductsOrderUserService = async (idUser: string) => {

    const ordersRepository = AppDataSource.getRepository(Orders)
    
    const productsOrders = await ordersRepository.createQueryBuilder("orders")
    .innerJoinAndSelect("orders.ordersProducts", "orders_products")
    .innerJoinAndSelect("orders.user", "user")
    .innerJoinAndSelect("orders_products.product", "products")
    .where("user.id = :id", { id: idUser })
    .getMany();

    const returned = productsOrders.map(ordersProd => {
        const {delivered, id, orderedAt, ordersProducts} = ordersProd

        const newOrdersFormat = {
            delivered, 
            id, 
            orderedAt, 
            ordersProducts
        }

        return  newOrdersFormat

    })
    
    return returned

}

export default listProductsOrderUserService