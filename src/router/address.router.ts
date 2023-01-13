import { Router } from "express";
import { updateAddressController } from "../controlles/address/address.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";

export const addressRouter = Router();

addressRouter.patch("",authTokenMiddleware,updateAddressController);
