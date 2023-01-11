import { create } from "domain"
import AppDataSource from "../../data-source"
import { Orders } from "../../entities/orders.entity"
import { OrdersProducts } from "../../entities/ordersProducts.entity"
import { User } from "../../entities/user.entity"

const createOrderService = async(dataOrder)=>{

    const idUser = "0eedece5-a8c6-41d3-a07c-1b807aaa7520"
    const userRepository = AppDataSource.getRepository(User)
    const orderRepository = AppDataSource.getRepository(Orders)
    const orderProductsRepository = AppDataSource.getRepository(OrdersProducts)

    const user = await userRepository.findOneBy({id: idUser})
    console.log(user)

    const newOrder = orderRepository.create({
        ...dataOrder,user
    })
    const ordersCreated= await orderRepository.save(newOrder)

    console.log(dataOrder)
    

    const newOrdersProduct=  orderProductsRepository.create({
        ...dataOrder,
        orders: ordersCreated

        
    })

    await orderProductsRepository.save(newOrdersProduct)

    
}

export default createOrderService