import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { User } from "../../entities/user.entity";
import { Products } from "../../entities/products.entity";
import { Address } from "../../entities/address.entity";
import { Orders } from "../../entities/orders.entity";
import { Comments } from "../../entities/comments.entity";
import { OrdersProducts } from "../../entities/ordersProducts.entity";
import { DataSource } from "typeorm";
import {
  mockedInvalidUserLogin,
  mockedInvalidIdNumber,
  mockedInvalidProductUpdateName,
  mockedProductRequest,
  mockedProductRequest2,
  mockedProductUpdate,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserAddressUpdate,
  mockedUserInvalidRequest,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
  mockedUserResponse,
  mockedUserUpdate,
  mockedInvalidId,
  mockedUserUpdate2,
  mockedInvalidField,
} from "../mocks";

export {
  AppDataSource,
  DataSource,
  User,
  Products,
  app,
  mockedInvalidIdNumber,
  mockedInvalidProductUpdateName,
  mockedProductRequest,
  mockedProductRequest2,
  mockedProductUpdate,
  mockedInvalidUserLogin,
  mockedUserUpdate2,
  mockedInvalidId,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserAddressUpdate,
  mockedUserInvalidRequest,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
  mockedUserResponse,
  mockedUserUpdate,
  mockedInvalidField,
  request,
  Address,
  Comments,
  Orders,
  OrdersProducts,
};
