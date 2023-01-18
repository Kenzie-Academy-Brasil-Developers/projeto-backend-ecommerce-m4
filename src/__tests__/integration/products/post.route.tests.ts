import {
  mockedInvalidProductRequest,
  mockedProductRequest,
  mockedUserLogin,
} from "../../mocks";
import {
  AppDataSource,
  DataSource,
  app,
  mockedUserRequest,
  request,
  mockedAdminRequest,
  mockedAdminLogin,
} from "../index";
import {usersRepository, productsRepository} from "../../../utils/repositories.ultil"

describe("/products", () => {
  let connection: DataSource;
  const baseUrl = "/products";
  
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
    await productsRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /products - should be able to create a product", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", adminToken)
      .send(mockedProductRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("stock");
    expect(response.body).toHaveProperty("available");
    const [product, amount] = await productsRepository.findAndCountBy({
      id: response.body.id,
    });
    expect(amount).toBe(1);
  });
  it("POST /products - should not be able to create a product without authentication", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedProductRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("POST /products - should not be able to create a product without admin permission", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send(mockedProductRequest);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
  it("POST /products - should not be able to create a product with invalid data", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", adminToken)
      .send(mockedInvalidProductRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  it("POST /products - should not be able to create a product with a name that already exists", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", adminToken)
      .send(mockedProductRequest);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
});
