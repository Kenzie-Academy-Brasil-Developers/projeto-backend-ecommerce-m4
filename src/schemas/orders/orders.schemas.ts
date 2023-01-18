import * as yup from "yup";
import { SchemaOf } from "yup";
import { IOrderRequest } from "../../interfaces/orders.interfaces";

const ordersProductSchema: SchemaOf<IOrderRequest> = yup.object().shape({
  product: yup.number().required(),
  amount: yup.number().required(),
});

const productsListSchema = yup.array(ordersProductSchema);

export { productsListSchema };
