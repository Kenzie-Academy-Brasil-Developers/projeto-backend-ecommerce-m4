import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { User } from "../../../entities/user.entity";
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
      .then(async (resp) => {
        connection = resp;
      })
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

  it("POST /users - should not be able to create user with invalid body", async () => {
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

  it("GET /users - should be able to list all users", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);

    const adminToken = `Bearer ${adminLoginResponse.body.token}`;
    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);

    expect(response.body).toHaveProperty("map");
    expect(response.body[0]).not.toHaveProperty("password");
  });

  it("GET /users - should not be able to list users without authentication", async () => {
    const response = await request(app).get(baseUrl);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /users - should not be able to list users not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;
    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", userToken);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("PATCH /users/:id - should not be able to update user without authentication", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const userToBeUpdated = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/users/${userToBeUpdated.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /users/:id - should not be able to update user with invalid id", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/4a1f1b51-eb60-4b1f-8356-59c4ccf24bf4`)
      .set("Authorization", adminToken)
      .send(mockedUserUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /users/:id - should not be able to update isAdm field value", async () => {
    const admingLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${admingLoginResponse.body.token}`;

    const userToBeUpdatedRequest = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);
    const userTobeUpdateId = userToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch(`${baseUrl}/${userTobeUpdateId}`)
      .set("Authorization", adminToken)
      .send({ isAdm: true });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("PATCH /users/:id - should not be able to update user id", async () => {
    const admingLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${admingLoginResponse.body.token}`;

    const userToBeUpdatedRequest = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);
    const userTobeUpdateId = userToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch(`${baseUrl}/${userTobeUpdateId}`)
      .set("Authorization", adminToken)
      .send({ id: "4a1f1b51-eb60-4b1f-8356-59c4ccf24bf4" });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("PATCH /users/:id - should not be able to update another user without adm permission", async () => {
    const createUserToUpdate = await request(app)
      .post(baseUrl)
      .send(mockedUserRequest2);
    const userToUpdateId = createUserToUpdate.body.id;

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const getUserResponse = await request(app)
      .get(baseUrl)
      .set("Authorization", userToken);
    const response = await request(app)
      .patch(`${baseUrl}/${userToUpdateId}`)
      .set("Authorization", userToken)
      .send(mockedUserUpdate);

    if (getUserResponse.body.isAdm) {
      expect(response.body.name).toEqual(mockedUserUpdate.name);
      expect(response.body.age).toEqual(mockedUserUpdate.age);
      expect(response.status).toBe(200);
    } else {
      expect(response.body).toHaveProperty("message");
      expect(response.status).toBe(403);
    }
  });

  it("PATCH /users/:id - should be able to update an user", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = adminLoginResponse.body.token;

    const userToBeUpdated = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);

    const userToBeUpdatedId = userToBeUpdated.body[0].id;

    const response = await request(app)
      .patch(`${baseUrl}/${userToBeUpdatedId}`)
      .set("Authorization", adminToken)
      .send(mockedUserUpdate);

    expect(response.body.name).toEqual(mockedUserUpdate.name);
    expect(response.body.age).toEqual(mockedUserUpdate.age);
    expect(response.status).toBe(200);
  });

  it("PATCH /users/:id/address - should be able to update user address", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const responseUser = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const userId = responseUser.body[0].id;
    const response = await request(app)
      .patch(`${baseUrl}/${userId}/address`)
      .set("Authorization", userToken)
      .send(mockedUserAddressUpdate);

    expect(response.body.city).toEqual(mockedUserAddressUpdate.city);
    expect(response.body.state).toEqual(mockedUserAddressUpdate.state);
    expect(response.body.street).toEqual(mockedUserAddressUpdate.street);
    expect(response.body.number).toEqual(mockedUserAddressUpdate.number);
    expect(response.body.zipCode).toEqual(mockedUserAddressUpdate.zipCode);
    expect(response.status).toBe(200);
  });

  it("DELETE /users/:id - should not be able to delete an user with an invalid id", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .delete(`${baseUrl}/4a1f1b51-eb60-4b1f-8356-59c4ccf24bf4`)
      .set("Authorization", adminToken);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("DELETE /users/:id - should not be able to delete an user without authentication", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const userToBeDeleted = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `${baseUrl}/${userToBeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /users/:id - should not be able to delete an user without being admin", async () => {
    const createUserToDelete = await request(app)
      .post(baseUrl)
      .send(mockedUserRequest2);
    const userToUpdateId = createUserToDelete.body.id;

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const getUserResponse = await request(app)
      .get(baseUrl)
      .set("Authorization", userToken);
    const response = await request(app)
      .patch(`${baseUrl}/${userToUpdateId}`)
      .set("Authorization", userToken)
      .send(mockedUserUpdate);

    if (getUserResponse.body.isAdm) {
      expect(response.body.name).toEqual(mockedUserUpdate.name);
      expect(response.body.age).toEqual(mockedUserUpdate.age);
      expect(response.status).toBe(200);
    } else {
      expect(response.body).toHaveProperty("message");
      expect(response.status).toBe(403);
    }
  });

  it("DELETE /users/:id - should be able to soft delete an user", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userToBeDeleted = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);

    const userId = userToBeDeleted.body[0].id;
    const response = await request(app)
      .delete(`${baseUrl}/${userId}`)
      .set("Authorization", adminToken);

    expect(response.status).toBe(204);
    expect(userToBeDeleted.body[0]).toEqual(
      expect.objectContaining({
        deletedAt: expect.any(String),
      })
    );
  });

  it("DELETE /users/:id - should not be able to delete an user with deletedAt not null", async () => {
    await request(app).post(baseUrl).send(mockedAdminRequest);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userToBeDeleted = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);

    const userId = userToBeDeleted.body[0].id;

    const response = await request(app)
      .delete(`${baseUrl}/${userId}`)
      .set("Authorization", adminToken);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
