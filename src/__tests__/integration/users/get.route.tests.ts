import {
  AppDataSource,
  DataSource,
  app,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserLogin,
  mockedUserRequest,
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

  it("GET /users - should be able to list all users", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", adminToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
    expect(response.body[0]).not.toHaveProperty("password");
  });

  it("GET /users - should not be able to list users without authentication", async () => {
    const response = await request(app).get(baseUrl);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /users - should not be able to list users not being admin", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", userToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
