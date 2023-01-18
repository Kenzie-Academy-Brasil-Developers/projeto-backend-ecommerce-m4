import Router from "express";
import validatedBodyMiddleware from "../middlewares/validatedData.middleware";
import { sessionController } from "../controllers/session/session.controllers";
import { sessionSchema } from "../schemas/session/session.schemas";

const sessionRouter = Router();

sessionRouter.post(
  "",
  validatedBodyMiddleware(sessionSchema),
  sessionController
);

export default sessionRouter;
