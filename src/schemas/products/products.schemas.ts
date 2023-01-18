import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductRequest, iProductUpdateRequest } from "../../interfaces/products.interfaces";

const productRequestSchema: SchemaOf<IProductRequest> = yup.object().shape({
  name: yup.string().max(120).required(),
  price: yup.number().required(),
  description: yup.string().max(300).required(),
  amount: yup.number().required(),
  available: yup.boolean(),
});

const productUpdateRequestSchema: SchemaOf<iProductUpdateRequest> = yup.object().shape({
  name: yup.string().max(120),
  price: yup.number(),
  description: yup.string().max(300),
  amount: yup.number(),
  available: yup.boolean(),
});

export { productRequestSchema, productUpdateRequestSchema };
