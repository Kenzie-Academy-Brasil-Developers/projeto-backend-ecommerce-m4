import {Router} from "express"
import { createOrderController, listOrderProductController, updateOrderController } from "../controlles/orders/orders.controllers"
import { authTokenMiddleware } from "../middleweres/authToken.middlewere"
import { isAdmMiddlewere } from "../middleweres/isAdm.Middlewere"

const ordersRouter = Router()

ordersRouter.post('',authTokenMiddleware,createOrderController)
ordersRouter.patch('/:id',authTokenMiddleware, isAdmMiddlewere,updateOrderController)
ordersRouter.get('/:id', listOrderProductController)

export default ordersRouter
