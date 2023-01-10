import { Router } from "express";
import { createProductController, listProductController } from "../controlles/products/products.controllers";

const productRouter = Router();

productRouter.post('', createProductController)
productRouter.get('', listProductController)


export default productRouter