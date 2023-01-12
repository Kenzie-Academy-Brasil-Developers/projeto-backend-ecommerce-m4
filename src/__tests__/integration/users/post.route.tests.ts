import { getRounds } from "bcryptjs";
import {
  AppDataSource,
  DataSource,
  User,
  app,
  mockedUserInvalidRequest,
  mockedUserRequest,
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

  it("POST /users - should be able to create an user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");

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

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /users - should not be able to create an user that already exists", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
});
