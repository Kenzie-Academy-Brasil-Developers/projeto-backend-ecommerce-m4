import {Router} from "express"
import { createOrderController } from "../controlles/orders/orders.controllers"

const ordersRouter = Router()

ordersRouter.post('',createOrderController)

export default ordersRouter
