import { Router } from "express";
import { updateAddressController } from "../controller/address/address.controllers";
import { authTokenMiddleware } from "../middleweres/authToken.middlewere";
import validatedBodyMiddleware from "../middleweres/validatedData.middleware";
import { addressSchemaRequest } from "../schemas/users/users.schemas";

export const addressRouter = Router();

addressRouter.patch(
  "",
  authTokenMiddleware,
  validatedBodyMiddleware(addressSchemaRequest),
  updateAddressController
);
