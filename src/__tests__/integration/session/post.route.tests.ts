import {
  AppDataSource,
  DataSource,
  app,
  request,
  mockedUserLogin,
  mockedUserRequest,
  mockedInvalidUserLogin,
} from "../index";
import {usersRepository} from "../../../utils/repositories.ultil"

describe("/session", () => {
  let connection: DataSource;
  const baseUrl = "/session";
  
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

  it("POST / session - should be able to login", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);

    const response = await request(app).post(baseUrl).send(mockedUserLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
  it("POST / session - should not be able to login with incorrect password or email", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);

    const response = await request(app)
      .post(baseUrl)
      .send(mockedInvalidUserLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
