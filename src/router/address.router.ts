import { Router } from "express";
import { updateAddressController } from "../controlles/address/address.controllers";

export const addressRouter = Router();

addressRouter.patch("/:id/address", updateAddressController);
