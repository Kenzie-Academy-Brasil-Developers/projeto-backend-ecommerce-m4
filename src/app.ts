import "express-async-errors";
import "reflect-metadata";
import express       from "express";
import sessionRouter from "./routes/session.routes";
import productRouter from "./routes/product.routes";
import ordersRouter  from "./routes/orders.routes";
import UserRouter from "./routes/users.routes";
import { commentsRouter } from "./routes/comments.routes";
import { errorHandler   } from "./errors/errors";
import { addressRouter  } from "./routes/address.routes";

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
