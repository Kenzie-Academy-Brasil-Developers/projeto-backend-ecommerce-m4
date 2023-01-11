import { mockedInvalidId, mockedUserUpdate2 } from "../../mocks";
import {
  AppDataSource,
  DataSource,
  User,
  app,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserAddressUpdate,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
  mockedUserUpdate,
  request,
} from "../index";

describe("/users", () => {
  let connection: DataSource;
  const baseUrl = "/users";
  const userRepository = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (resp) => {
        connection = resp;
      })
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  beforeEach(async () => {
    const usersData = await userRepository.find();
    await userRepository.remove(usersData);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("PATCH /users/:id - should not be able to update user without authentication", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const response = await request(app).patch(`/users/${user.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /users/:id - should not be able to update user with invalid id", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${mockedInvalidId}`)
      .set("Authorization", adminToken)
      .send(mockedUserUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /users/:id - should not be able to update isAdm field value", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userToBeUpdated = userRepository.create(mockedUserRequest);
    await userRepository.save(userToBeUpdated);

    const response = await request(app)
      .patch(`${baseUrl}/${userToBeUpdated.id}`)
      .set("Authorization", adminToken)
      .send({ isAdm: true });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("PATCH /users/:id - should not be able to update user id", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userToBeUpdated = userRepository.create(mockedUserRequest);
    await userRepository.save(userToBeUpdated);

    const response = await request(app)
      .patch(`${baseUrl}/${userToBeUpdated.id}`)
      .set("Authorization", adminToken)
      .send({ id: mockedInvalidId });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("PATCH /users/:id - should not be able to update another user without adm permission", async () => {
    const userThatWillUpdate = userRepository.create(mockedUserRequest);
    await userRepository.save(userThatWillUpdate);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userThatWillUpdateToken = `Bearer ${userLoginResponse.body.token}`;

    const userToUpdate = userRepository.create(mockedUserRequest2);
    await userRepository.save(userToUpdate);

    const response = await request(app)
      .patch(`${baseUrl}/${userToUpdate.id}`)
      .set("Authorization", userThatWillUpdateToken)
      .send(mockedUserUpdate2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("PATCH /users/:id - should be able to update an user", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${user.id}`)
      .set("Authorization", userToken)
      .send(mockedUserUpdate);

    expect(response.body.name).toBe(mockedUserUpdate.name);
    expect(response.body.age).toBe(mockedUserUpdate.age);
    expect(response.status).toBe(200);
  });

  it("PATCH /users/:id/address - should be able to update user address", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${user.id}/address`)
      .set("Authorization", userToken)
      .send(mockedUserAddressUpdate);

    expect(response.body.address.city).toBe(mockedUserAddressUpdate.city);
    expect(response.body.address.state).toBe(mockedUserAddressUpdate.state);
    expect(response.body.address.street).toBe(mockedUserAddressUpdate.street);
    expect(response.body.address.number).toBe(mockedUserAddressUpdate.number);
    expect(response.body.address.zipCode).toBe(mockedUserAddressUpdate.zipCode);
    expect(response.status).toBe(200);
  });
});
