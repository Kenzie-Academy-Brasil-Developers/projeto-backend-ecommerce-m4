import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest, IAddressUpdatedRequest } from "../../interfaces/address.interfaces";
import { IDataUserRequest, IDataUserUpdateResponse, IUpdateUserRequest } from "../../interfaces/users.interfaces";

const addressSchemaRequest: SchemaOf<IAddressRequest> = yup.object().shape({
  street: yup.string().max(50).required(),
  city: yup.string().max(50).required(),
  zipCode: yup.string().max(8).required(),
  state: yup.string().max(2).required(),
  number: yup.string().max(40).required(),
});

const addressUpdateSchemaRequest: SchemaOf<IAddressUpdatedRequest> = yup.object().shape({
  street: yup.string().max(50),
  city: yup.string().max(50),
  zipCode: yup.string().max(8),
  state: yup.string().max(2),
  number: yup.string().max(40),
});

const userRequestSchema: SchemaOf<IDataUserRequest> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  address: addressSchemaRequest.required(),
});

const userUpdateRequestSchema: SchemaOf<IUpdateUserRequest> = yup.object().shape({
  name: yup.string(),
  age: yup.number(),
  email: yup.string().email(),
  password: yup.string(),
});

const userResponseUpdateSchema: SchemaOf<IDataUserUpdateResponse> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().email().required(),
});

export {
  addressSchemaRequest,
  addressUpdateSchemaRequest,
  userRequestSchema,
  userUpdateRequestSchema,
  userResponseUpdateSchema,
};
