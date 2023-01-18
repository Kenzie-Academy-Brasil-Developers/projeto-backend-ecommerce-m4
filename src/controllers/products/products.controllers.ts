import { Request, Response } from "express";
import {
  IProductRequest,
  iProductUpdateRequest,
} from "../../interfaces/products.interfaces";
import createProductsServices from "../../services/products/createProducts.service";
import deleteProductService from "../../services/products/deleteProduct.service";
import updateProductService from "../../services/products/updateProduct.service";
import listProductsServices from "../../services/products/listProducts.service";
import getProductByIdService from "../../services/products/getProductById.service";

const createProductController = async (req: Request, res: Response) => {
  const productData: IProductRequest = req.body;
  const newProduct = await createProductsServices(productData);

  return res.status(201).json(newProduct);
};

const listProductController = async (req: Request, res: Response) => {
  const products = await listProductsServices();

  return res.json(products);
};

const getProductByIdController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await getProductByIdService(id);

  return res.json(product);
};

const updateProductController = async (req: Request, res: Response) => {
  const idProduct = Number(req.params.id);
  const dataBody: iProductUpdateRequest = req.body;

  const updatedBody = await updateProductService(idProduct, dataBody);

  return res.json(updatedBody);
};

const deleteProductController = async (req: Request, res: Response) => {
  const idProduct = Number(req.params.id);

  await deleteProductService(idProduct);

  return res.status(204).json();
};

export {
  createProductController,
  deleteProductController,
  getProductByIdController,
  listProductController,
  updateProductController,
};
