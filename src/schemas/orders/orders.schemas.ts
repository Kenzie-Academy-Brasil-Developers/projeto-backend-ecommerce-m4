import * as yup from "yup";
import { AnySchema } from "yup";

const ordersProductSchema = yup.object().shape({
  product: yup.number().required(),
  amount: yup.number().required(),
});

const productsListSchema = yup.array(ordersProductSchema);

export { productsListSchema };
