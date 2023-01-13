import {Router} from "express"
import { createOrderController, listOrderProductController, updateOrderController } from "../controlles/orders/orders.controllers"
import { authTokenMiddleware } from "../middleweres/authToken.middlewere"
import { isAdmMiddlewere } from "../middleweres/isAdm.Middlewere"
import validatedBodyMiddleware from "../middleweres/validatedData.middleware"
import { productsListSchema } from "../schemas/orders/orders.schemas"

const ordersRouter = Router()

ordersRouter.post('',authTokenMiddleware,validatedBodyMiddleware(productsListSchema), createOrderController)
ordersRouter.patch('/:id',authTokenMiddleware, isAdmMiddlewere,updateOrderController)
ordersRouter.get('/:id', listOrderProductController)

export default ordersRouter
