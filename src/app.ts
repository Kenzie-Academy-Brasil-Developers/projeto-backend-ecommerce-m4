import "express-async-error";
import express from "express";
import productRouter from "./router/product.routes";
import { router } from "./router/users.routes";

const app = express();

app.use(express.json());
app.use(router);


app.use('/products', productRouter)

export default app;
