import { Request, Response } from "express";
import createProductsServices from "../../services/products/createProducts.services";

import deleteProductService from "../../services/products/deleteProduct.service";
import updateProductService from "../../services/products/updateProduct.service";
import listProductsServices from "../../services/products/listProducts.services";
import { IProductRequest } from "../../interfaces/products.interfaces";

interface iProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  amount?: number;
  avaible?: boolean;
}

export const createProductController = async (req: Request, res: Response) => {
  const productData: IProductRequest = req.body;
  const newProduct = await createProductsServices(productData);

  return res.status(200).json(newProduct);
};

export const listProductController = async (req: Request, res: Response) => {
  const products = await listProductsServices();

  return res.json(products);
};

export const updateProductController = async (req: Request, res: Response) => {
  const idProduct = Number(req.params.id);
  const dataBody: iProductUpdateRequest = req.body;

  const updatedBody = await updateProductService(idProduct, dataBody);

  return res.json(updatedBody);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const idProduct = Number(req.params.id);

  await deleteProductService(idProduct);

  return res.status(200).json();
};
