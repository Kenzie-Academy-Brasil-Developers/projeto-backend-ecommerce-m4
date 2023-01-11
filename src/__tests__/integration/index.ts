import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { User } from "../../entities/user.entity";
import { DataSource } from "typeorm";
import {
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserAddressUpdate,
  mockedUserInvalidRequest,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
  mockedUserResponse,
  mockedUserUpdate,
} from "../mocks";

export {
  AppDataSource,
  DataSource,
  User,
  app,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserAddressUpdate,
  mockedUserInvalidRequest,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
  mockedUserResponse,
  mockedUserUpdate,
  request,
};
