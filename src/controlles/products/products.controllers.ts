import createProductsServices, { IproductRequest } from '../../services/createProducts.services';
import { Request, Response } from "express";
import listProductsServices from '../../services/listProducts.services';



export const createProductController = async (req: Request, res: Response) => {
  
  const productData: IproductRequest = req.body
  const newProduct = await createProductsServices(productData)
  
  return res.status(200).json({newProduct})
};

export const listProductController = async (req:Request, res: Response) => {

  const products = await listProductsServices()

  return res.json(products)

};

export const updateProductController = (req: Request, res: Response) => {
  return res.status(200).json({});
};

export const deleteProductController = (req: Request, res: Response) => {
  return res.status(200).json({});
};
