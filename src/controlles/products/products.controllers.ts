import { Request, Response } from "express";
import { deleteProductService } from "../../services/deleteProduct.service";
import { updateProductService } from "../../services/updateProduct.service";

interface iProductUpdateRequest{
  "name"?: string,
  "description"?: string,
  "price"?: number,
  "amount"?: number,
  "avaible"?: boolean
}

export const createProductController = (req: Request, res: Response) => {
  return res.status(200).json({});
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
