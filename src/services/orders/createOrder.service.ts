import { create } from "domain"
import AppDataSource from "../../data-source"
import { Orders } from "../../entities/orders.entity"
import { OrdersProducts } from "../../entities/ordersProducts.entity"
import { User } from "../../entities/user.entity"

const createOrderService = async(dataOrder, idUser)=>{

    
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
    
    
    dataOrder.forEach ( async (product) => {
        const newOrdersProduct=  orderProductsRepository.create({
            ...product,
            orders: ordersCreated
            
        });
     await orderProductsRepository.save(newOrdersProduct)

    })

    return {message: 'order created successfully'}

    
}

export default createOrderService