import { Router } from "express";
import { updateAddressController } from "../controllers/address/address.controllers";
import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { addressUpdateSchemaRequest } from "../schemas/users/users.schemas";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";

export const addressRouter = Router();

addressRouter.patch(
  "",
  authTokenMiddleware,
  validatedBodyMiddleware(addressUpdateSchemaRequest),
  updateAddressController
);
