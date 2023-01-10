import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../entities/user.entity";
import { DataSource } from "typeorm";
import {
  mockedUserInvalidRequest,
  mockedUserRequest,
  mockedUserResponse,
} from "../../mocks";
import { getRounds } from "bcryptjs";

describe("/users", () => {
  let connection: DataSource;
  const baseUrl = "/users";
  const userRepository = AppDataSource.getRepository(User);

  // const uuidv4Regex =
  //   /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((resp) => (connection = resp))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /users - should be able to create an user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("zipCode");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual(mockedUserResponse.name);
    expect(response.body.email).toEqual(mockedUserResponse.email);
    expect(response.body.isAdm).toEqual(false);
    expect(response.status).toBe(201);

    const [user, amount] = await userRepository.findAndCountBy({
      id: response.body.id,
    });
    expect(amount).toBe(1);
    expect(getRounds(user[0].password)).toBeTruthy();
  });

  it("POST /users - should not be able to create user | invalid body", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserInvalidRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("POST /users - should not be able to create an user that already exists", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });
});
