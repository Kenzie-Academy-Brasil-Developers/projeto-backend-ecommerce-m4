import "express-async-errors";
import "reflect-metadata";
import express       from "express";
import sessionRouter from "./router/session.routes";
import productRouter from "./router/product.routes";
import ordersRouter  from "./router/orders.routes";
import { UserRouter     } from "./router/users.routes";
import { commentsRouter } from "./router/comments.routes";
import { errorHandler   } from "./errors/errors";
import { addressRouter  } from "./router/address.routes";

const app = express();
app.use(express.json());

app.use("/users", UserRouter       );
app.use("/products", commentsRouter);
app.use("/address", addressRouter  );
app.use("/products", productRouter );
app.use("/session", sessionRouter  );
app.use("/orders", ordersRouter    );

app.use(errorHandler);

export default app;
