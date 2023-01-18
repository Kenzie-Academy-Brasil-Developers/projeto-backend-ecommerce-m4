import { Router } from "express";
import {
  createOrderController,
  listAllOrdersController,
  listOrderProductController,
  listProductsOrderUserController,
  updateOrderController,
} from "../controllers/orders/orders.controllers";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddlewere } from "../middlewares/isAdm.middleware";
import { orderExistsMiddlewere } from "../middlewares/orderExists.middleware";
import { productsListSchema } from "../schemas/orders/orders.schemas";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";
import verifyProductCartMiddleware from "../middlewares/verifyProductsCart.middleware";

const ordersRouter = Router();

ordersRouter.post(
  "",
  authTokenMiddleware,
  verifyProductCartMiddleware,
  validatedBodyMiddleware(productsListSchema),
  createOrderController
);

ordersRouter.get(
  "",
  authTokenMiddleware,
  isAdmMiddlewere,
  listAllOrdersController
);

ordersRouter.get(
  "/products/user",
  authTokenMiddleware,
  listProductsOrderUserController
);

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
