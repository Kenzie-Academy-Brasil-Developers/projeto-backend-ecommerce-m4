import { mockedInvalidUserLogin } from "../../mocks";
import {
  AppDataSource,
  DataSource,
  User,
  app,
  mockedUserLogin,
  mockedUserRequest,
  request,
} from "../index";

describe("/session", () => {
  let connection: DataSource;
  const baseUrl = "/session";
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

  it("POST / session - should be able to login", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const response = await request(app).post(baseUrl).send(mockedUserLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });
  it("POST / session - should not be able to login with incorrect password or email", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const response = await request(app)
      .post(baseUrl)
      .send(mockedInvalidUserLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
  it("POST / session - should not be able to login if the user is deleted", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save({ ...user, deletedAt: new Date() });

    const response = await request(app).post(baseUrl).send(mockedUserLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
