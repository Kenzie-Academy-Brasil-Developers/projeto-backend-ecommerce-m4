import "express-async-errors";
import "reflect-metadata"
import express from "express";

import { UserRouter } from "./router/users.routes";

import productRouter from "./router/product.routes";

import { commentsRouter } from "./router/comments.router";


import { errorHandler } from "./errors/errors";
import ordersRouter from "./router/orders.routes";



const app = express();

app.use(express.json());
app.use("/users", UserRouter);
app.use("/products", commentsRouter);
app.use("/orders", ordersRouter)
app.use("/products", productRouter);

app.use(errorHandler)

export default app;
