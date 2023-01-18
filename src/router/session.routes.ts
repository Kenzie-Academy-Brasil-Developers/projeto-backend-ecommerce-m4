import Router from "express";
import { sessionController } from "../controller/session/session.controllers";
import validatedBodyMiddleware from "../middleweres/validatedData.middleware";
import { sessionSchema } from "../schemas/session/session.schema";

const sessionRouter = Router();

sessionRouter.post(
  "",
  validatedBodyMiddleware(sessionSchema),
  sessionController
);

export default sessionRouter;
