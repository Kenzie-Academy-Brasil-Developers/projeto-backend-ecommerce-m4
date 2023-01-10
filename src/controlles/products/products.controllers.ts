import createProductsServices, { IproductRequest } from '../../services/createProducts.services';
import { Request, Response } from "express";
<<<<<<< HEAD
import { deleteProductService } from "../../services/deleteProduct.service";
import { updateProductService } from "../../services/updateProduct.service";

interface iProductUpdateRequest{
  "name"?: string,
  "description"?: string,
  "price"?: number,
  "amount"?: number,
  "avaible"?: boolean
}
=======
import listProductsServices from '../../services/listProducts.services';



export const createProductController = async (req: Request, res: Response) => {
  
  const productData: IproductRequest = req.body
  const newProduct = await createProductsServices(productData)
  
  return res.status(200).json({newProduct})
};

export const listProductController = async (req:Request, res: Response) => {

  const products = await listProductsServices()

  return res.json(products)
>>>>>>> 453875416c7a0ffc0bc44a10d8c831c73f53940f

};

export const updateProductController = async (req: Request, res: Response) => {

  const idProduct = Number(req.params.id)
  const dataBody: iProductUpdateRequest = req.body

  const updatedBody = await updateProductService(idProduct, dataBody)

  return res.status(204).json(updatedBody);
};

export const deleteProductController = async (req: Request, res: Response) => {

  const idProduct = Number(req.params.id)

  await deleteProductService(idProduct)

  return res.status(200);
  
};
