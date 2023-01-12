import Router from "express";
import { sessionController } from "../controlles/session/session.controllers";

const sessionRouter = Router();

sessionRouter.post("", sessionController);

export default sessionRouter;
