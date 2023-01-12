import { Request, Response } from "express";
import updatedAddressServices from "../../services/address/updatedAddress.services";

export const updateAddressController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const dataAddress = req.body;

  const newAddress = await updatedAddressServices(id, dataAddress);

  return res.status(200).json(newAddress);
};
