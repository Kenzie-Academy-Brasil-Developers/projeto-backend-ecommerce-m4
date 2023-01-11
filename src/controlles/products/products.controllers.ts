
import createProductsServices, {
  IproductRequest,
} from "../../services/createProducts.services";
import { Request, Response } from "express";
import { deleteProductService } from "../../services/deleteProduct.service";
import { updateProductService } from "../../services/updateProduct.service";

import createProductsServices, { IproductRequest } from '../../services/products/createProducts.services';
import { Request, Response } from "express";
import deleteProductService from "../../services/products/deleteProduct.service";
import updateProductService from "../../services/products/updateProduct.service";
import listProductsServices from "../../services/products/listProducts.services";


interface iProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  amount?: number;
  avaible?: boolean;
}

import listProductsServices from "../../services/listProducts.services";

export const createProductController = async (req: Request, res: Response) => {
  const productData: IproductRequest = req.body;
  const newProduct = await createProductsServices(productData);


export const createProductController = async (req: Request, res: Response) => {
  
  const productData: IproductRequest = req.body
  const newProduct = await createProductsServices(productData)
  
  return res.status(200).json(newProduct)
};

export const listProductController = async (req:Request, res: Response) => {


  return res.status(200).json({ newProduct });
};


export const listProductController = async (req: Request, res: Response) => {
  const products = await listProductsServices();

  return res.json(products);
};

export const updateProductController = async (req: Request, res: Response) => {
  const idProduct = Number(req.params.id);
  const dataBody: iProductUpdateRequest = req.body;


  const updatedBody = await updateProductService(idProduct, dataBody);

  const idProduct = Number(req.params.id)

  const dataBody: iProductUpdateRequest = req.body

  return res.json(updatedBody);

};

export const deleteProductController = async (req: Request, res: Response) => {
  const idProduct = Number(req.params.id);

  await deleteProductService(idProduct);

  return res.status(200).json()
  

};
