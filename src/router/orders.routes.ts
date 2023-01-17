import { Router } from "express";
import {
  createOrderController,
  listAllOrdersController,
  listOrderProductController,
  listProductsOrderUserController,
  updateOrderController,
} from "../controlles/orders/orders.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";
import { isAdmMiddlewere } from "../middleweres/isAdm.Middlewere";
import { orderExistsMiddlewere } from "../middleweres/orderExists.middleware";
import validatedBodyMiddleware from "../middleweres/validatedData.middleware";
import verifyProductCartMiddleware from "../middleweres/verifyProductsCart.middleware";
import { productsListSchema } from "../schemas/orders/orders.schemas";

const ordersRouter = Router();

ordersRouter.post(
  "",
  authTokenMiddleware,
  verifyProductCartMiddleware,
  validatedBodyMiddleware(productsListSchema),
  createOrderController
);

ordersRouter.get('', 
  authTokenMiddleware, 
  isAdmMiddlewere, 
  listAllOrdersController
)

ordersRouter.get('/products/user',
  authTokenMiddleware, 
  listProductsOrderUserController
)

ordersRouter.patch(
  "/:id",
  authTokenMiddleware,
  orderExistsMiddlewere,
  isAdmMiddlewere,
  updateOrderController
);
ordersRouter.get(
  "/:id",
  authTokenMiddleware,
  orderExistsMiddlewere,
  isAdmMiddlewere,
  listOrderProductController
);

export default ordersRouter;
