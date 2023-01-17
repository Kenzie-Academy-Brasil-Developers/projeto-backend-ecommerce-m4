import { Router } from "express";
import {
  createProductController,
  listProductController,
  updateProductController,
  deleteProductController,
  getProductByIdController,
} from "../controlles/products/products.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";
import { isAdmMiddlewere } from "../middleweres/isAdm.Middlewere";
import { productExistsMiddlewere } from "../middleweres/productExists.middlewere";
import validatedBodyMiddleware from "../middleweres/validatedData.middleware";
import { productRequestSchema, productUpdateRequestSchema } from "../schemas/products/products.schema";

const productRouter = Router();

productRouter.post(
  "",
  authTokenMiddleware,
  isAdmMiddlewere, 
  validatedBodyMiddleware(productRequestSchema),
  createProductController
);

productRouter.get("", listProductController);

productRouter.get("/:id",productExistsMiddlewere,getProductByIdController)

productRouter.patch(
  "/:id",
  authTokenMiddleware,
  isAdmMiddlewere,
  productExistsMiddlewere,
  validatedBodyMiddleware(productUpdateRequestSchema),
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
