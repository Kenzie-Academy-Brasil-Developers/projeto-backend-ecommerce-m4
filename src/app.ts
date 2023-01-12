import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { UserRouter } from "./router/users.routes";
import productRouter from "./router/product.routes";
import { commentsRouter } from "./router/comments.router";




import ordersRouter from "./router/orders.routes";



import { errorHandler } from "./errors/errors";
import { addressRouter } from "./router/address.router";
import sessionRouter from "./router/session.routes";


const app = express();

app.use(express.json());
app.use("/users", UserRouter);
app.use("/products", commentsRouter);



app.use("/users", addressRouter);

app.use("/products", productRouter);
app.use("/session", sessionRouter);

app.use(errorHandler);

export default app;
