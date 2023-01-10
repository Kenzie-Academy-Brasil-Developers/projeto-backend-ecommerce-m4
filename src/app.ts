import "express-async-error";
import express from "express";

import { UserRouter } from "./router/users.routes";

import productRouter from "./router/product.routes";
import { router } from "./router/users.routes";


const app = express();

app.use(express.json());
app.use("/users",UserRouter);


app.use('/products', productRouter)

export default app;
