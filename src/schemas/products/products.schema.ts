import * as yup from "yup";
import { AnySchema } from "yup";

const productRequestSchema = yup.object().shape({
  name: yup.string().max(120).required(),
  price: yup.string().matches(/^\d{1,12}(.\d{1,2})?$/, "Invalid price format"),
  description: yup.string().max(300).required(),
  amount: yup.number().required(),
  available: yup.boolean().required(),
});

const productUpdateRequestSchema = yup.object().shape({
  name: yup.string().max(120),
  price: yup.string().matches(/^\d{1,12}(.\d{1,2})?$/, "Invalid price format"),
  description: yup.string().max(300),
  amount: yup.number(),
  available: yup.boolean(),
});

export { productRequestSchema, productUpdateRequestSchema };
