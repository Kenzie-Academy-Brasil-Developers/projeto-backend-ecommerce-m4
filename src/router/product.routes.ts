import { Router } from "express";
import {
  createProductController,
  listProductController,
  updateProductController,
  deleteProductController,
} from "../controlles/products/products.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";
import { isAdmMiddlewere } from "../middleweres/isAdm.Middlewere";
import { productExistsMiddlewere } from "../middleweres/productExists.middlewere";

const productRouter = Router();

productRouter.post(
  "",
  authTokenMiddleware,
  isAdmMiddlewere,
  createProductController
);

productRouter.get("", listProductController);

productRouter.patch(
  "/:id",
  authTokenMiddleware,
  isAdmMiddlewere,
  productExistsMiddlewere,
  updateProductController
);
productRouter.delete(
  "/:id",
  authTokenMiddleware,
  isAdmMiddlewere,
  productExistsMiddlewere,
  deleteProductController
);

export default productRouter;
