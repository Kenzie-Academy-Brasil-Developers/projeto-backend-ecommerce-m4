import express from "express";
import { router } from "./router/users.routes";

const app = express();

app.use(express.json());
app.use(router);

export default app;
