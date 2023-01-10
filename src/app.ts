import express from "express";
import { UserRouter } from "./router/users.routes";

const app = express();

app.use(express.json());
app.use("/users",UserRouter);

export default app;
