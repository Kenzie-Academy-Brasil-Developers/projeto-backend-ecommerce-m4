import { Request, Response } from "express";
import updatedAddressServices from "../../services/address/updatedAddress.service";
import { IAddressUpdatedRequest } from "../../interfaces/address.interfaces";

const updateAddressController = async (req: Request, res: Response) => {
  const id: string = req.user.id;
  const dataAddress: IAddressUpdatedRequest = req.body;

  const newAddress = await updatedAddressServices(id, dataAddress);

  return res.status(200).json(newAddress);
};

export {updateAddressController}
