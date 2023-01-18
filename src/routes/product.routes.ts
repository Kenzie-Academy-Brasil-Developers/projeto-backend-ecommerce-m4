import { Router } from "express";
import {
  createProductController,
  listProductController,
  updateProductController,
  deleteProductController,
  getProductByIdController,
} from "../controllers/products/products.controllers";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddlewere } from "../middlewares/isAdm.middleware";
import { productExistsMiddlewere } from "../middlewares/productExists.middleware";
import {
  productRequestSchema,
  productUpdateRequestSchema,
} from "../schemas/products/products.schemas";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";
import { productIsAvailableMiddleware } from "../middlewares/productIsAvailable.middleware";

const productRouter = Router();

productRouter.post(
  "",
  authTokenMiddleware,
  isAdmMiddlewere,
  validatedBodyMiddleware(productRequestSchema),
  createProductController
);

productRouter.get("", listProductController);

productRouter.get(
  "/:id",
  productIsAvailableMiddleware,
  getProductByIdController
);

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
  productIsAvailableMiddleware,
  deleteProductController
);

export default productRouter;
