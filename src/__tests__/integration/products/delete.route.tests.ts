import {
  AppDataSource,
  DataSource,
  User,
  Products,
  app,
  mockedUserRequest,
  request,
  mockedInvalidIdNumber,
  mockedProductRequest,
  mockedUserLogin,
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

  it("DELETE /products/:id - should be able to delete a product", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .delete(`${baseUrl}/${product.id}`)
      .set("Authorization", adminToken);

    const dbProductCheck = await productRepository.findOneBy({
      id: product.id,
    });
    expect(response.status).toBe(204);
    expect(dbProductCheck).toBeNull();
  });
  it("DELETE /products/:id - should not be able to soft delete a product without authentication", async () => {
    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app).delete(`${baseUrl}/${product.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("DELETE /products/:id - should not be able to soft delete a product without admin permission", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .delete(`${baseUrl}/${product.id}`)
      .set("Authorization", userToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
  it("DELETE /products/:id - should not be able to delete a product with invalid ID", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .delete(`${baseUrl}/${mockedInvalidIdNumber}`)
      .set("Authorization", adminToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
