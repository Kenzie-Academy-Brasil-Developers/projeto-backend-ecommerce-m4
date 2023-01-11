import { Products } from "../../../entities/products.entity";
import {
  mockedInvalidProductRequest,
  mockedProductRequest,
  mockedUserLogin,
} from "../../mocks";
import {
  AppDataSource,
  DataSource,
  User,
  app,
  mockedUserRequest,
  request,
  mockedAdminRequest,
  mockedAdminLogin,
} from "../index";

describe("/products", () => {
  let connection: DataSource;
  const baseUrl = "/products";
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Products);

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
    const productsData = await productRepository.find();
    await productRepository.remove(productsData);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /products - should be able to create a product", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
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
    expect(response.body).toHaveProperty("amount");
    expect(response.body).toHaveProperty("available");
    const [product, amount] = await productRepository.findAndCountBy({
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
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
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
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
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
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", adminToken)
      .send(mockedProductRequest);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
});
