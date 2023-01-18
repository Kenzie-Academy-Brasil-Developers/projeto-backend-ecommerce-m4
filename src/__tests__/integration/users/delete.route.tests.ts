import {
  mockedInvalidId,
  AppDataSource,
  DataSource,
  app,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
  request,
} from "../index";
import {usersRepository} from "../../../utils/repositories.ultil"

describe("/users", () => {
  let connection: DataSource;
  const baseUrl = "/users";
 
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
    await usersRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it("DELETE /users/:id - should be able to soft delete an user", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userToBeDeleted = usersRepository.create(mockedUserRequest2);
    await usersRepository.save(userToBeDeleted);

    const response = await request(app)
      .delete(`${baseUrl}/${userToBeDeleted.id}`)
      .set("Authorization", adminToken);

    const userInDatabase = await usersRepository.findOneBy({
      id: userToBeDeleted.id,
    });

    expect(response.status).toBe(204);
    expect(userInDatabase).toBeNull();
  });

  it("DELETE /users/:id - should not be able to delete an user with an invalid id", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
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
    const userToBeDeleted = usersRepository.create(mockedUserRequest);
    await usersRepository.save(userToBeDeleted);

    const response = await request(app).delete(
      `${baseUrl}/${userToBeDeleted.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /users/:id - should not be able to delete another user without being admin", async () => {
    const userThatWillDelete = usersRepository.create(mockedUserRequest);
    await usersRepository.save(userThatWillDelete);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userThatWillDeleteToken = `Bearer ${userLoginResponse.body.token}`;

    const userToDelete = usersRepository.create(mockedUserRequest2);
    await usersRepository.save(userToDelete);

    const response = await request(app)
      .delete(`${baseUrl}/${userToDelete.id}`)
      .set("Authorization", userThatWillDeleteToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
