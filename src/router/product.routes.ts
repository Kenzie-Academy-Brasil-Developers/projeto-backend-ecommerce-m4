import { Router } from "express";
import { 
    createProductController, 
    listProductController,
    updateProductController,
    deleteProductController
} from "../controlles/products/products.controllers";
import {productExistsMiddlewere} from "../middleweres/productExists.middlewere"

const productRouter = Router();

productRouter.post('', createProductController)

productRouter.get('', listProductController)

productRouter.patch('/:id', 
    productExistsMiddlewere, 
    updateProductController
)
productRouter.delete('/:id',
    productExistsMiddlewere,
    deleteProductController
)

export default productRouter

