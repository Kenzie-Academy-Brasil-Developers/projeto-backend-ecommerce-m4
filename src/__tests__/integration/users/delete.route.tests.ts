import {
  mockedInvalidId,
  AppDataSource,
  DataSource,
  User,
  app,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
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
    await userRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it("DELETE /users/:id - should be able to soft delete an user", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userToBeDeleted = userRepository.create(mockedUserRequest2);
    await userRepository.save(userToBeDeleted);

    const response = await request(app)
      .delete(`${baseUrl}/${userToBeDeleted.id}`)
      .set("Authorization", adminToken);

    const userInDatabase = await userRepository.findOneBy({
      id: userToBeDeleted.id,
    });

    expect(response.status).toBe(204);
    expect(userInDatabase).toBeNull();
  });

  it("DELETE /users/:id - should not be able to delete an user with an invalid id", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .delete(`${baseUrl}/${mockedInvalidId}`)
      .set("Authorization", adminToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /users/:id - should not be able to delete an user without authentication", async () => {
    const userToBeDeleted = userRepository.create(mockedUserRequest);
    await userRepository.save(userToBeDeleted);

    const response = await request(app).delete(
      `${baseUrl}/${userToBeDeleted.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /users/:id - should not be able to delete another user without being admin", async () => {
    const userThatWillDelete = userRepository.create(mockedUserRequest);
    await userRepository.save(userThatWillDelete);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userThatWillDeleteToken = `Bearer ${userLoginResponse.body.token}`;

    const userToDelete = userRepository.create(mockedUserRequest2);
    await userRepository.save(userToDelete);

    const response = await request(app)
      .delete(`${baseUrl}/${userToDelete.id}`)
      .set("Authorization", userThatWillDeleteToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
