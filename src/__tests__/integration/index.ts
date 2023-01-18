import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
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
  request
};
