import {
  AppDataSource,
  DataSource,
  User,
  Products,
  app,
  mockedUserRequest,
  request,
  mockedAdminRequest,
  mockedAdminLogin,
  mockedInvalidIdNumber,
  mockedInvalidProductUpdateName,
  mockedProductRequest,
  mockedProductRequest2,
  mockedProductUpdate,
  mockedUserLogin,
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
    await userRepository.createQueryBuilder().delete().execute();
    await productRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("PATCH /products/:id - should be able to update a product", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .patch(`${baseUrl}/${product.id}`)
      .set("Authorization", adminToken)
      .send(mockedProductUpdate);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(mockedProductUpdate.name);
    expect(response.body.description).toBe(mockedProductUpdate.description);
    expect(response.body.price).toBe(mockedProductUpdate.price);
    expect(response.body.stock).toBe(mockedProductUpdate.stock);
  });
  it("PATCH /products/:id - should not be able to update a product without authentication", async () => {
    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .patch(`${baseUrl}/${product.id}`)
      .send(mockedProductUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("PATCH /products/:id - should not be able to update a product without admin permission", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .patch(`${baseUrl}/${product.id}`)
      .set("Authorization", userToken)
      .send(mockedProductUpdate);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
  it("PATCH /products/:id - should not be able to update a product with a name that already exists", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const productToBeUpdated = productRepository.create(mockedProductRequest2);
    await productRepository.save(productToBeUpdated);

    const response = await request(app)
      .patch(`${baseUrl}/${productToBeUpdated.id}`)
      .set("Authorization", adminToken)
      .send(mockedInvalidProductUpdateName);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
  it("PATCH /products/:id - should not be able to update with invalid Id", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${mockedInvalidIdNumber}`)
      .set("Authorization", adminToken)
      .send(mockedProductUpdate);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
