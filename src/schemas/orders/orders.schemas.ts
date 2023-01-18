import * as yup from "yup";
import { AnySchema } from "yup";
import { IOrderRequest } from "../../interfaces/orders.interfaces";

const ordersProductSchema: AnySchema<IOrderRequest> = yup.object().shape({
  product: yup.number().required(),
  amount: yup.number().required(),
});

const productsListSchema = yup.array(ordersProductSchema);

export { productsListSchema };
