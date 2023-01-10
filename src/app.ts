import "express-async-errors";
import "reflect-metadata"
import express from "express";
import productRouter from "./router/product.routes";
import { router } from "./router/users.routes";
import { errorHandler } from "./errors/errors";

const app = express();

app.use(express.json());
app.use(router);


app.use('/products', productRouter)

app.use(errorHandler)

export default app;
