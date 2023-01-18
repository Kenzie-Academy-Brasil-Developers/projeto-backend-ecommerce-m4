import {
  AppDataSource,
  DataSource,
  app,
  mockedUserRequest,
  request,
  mockedInvalidIdNumber,
  mockedProductRequest,
  mockedUserLogin,
  mockedAdminRequest,
  mockedAdminLogin,
} from "../index";
import {
  usersRepository,
  productsRepository,
} from "../../../utils/repositories.ultil";

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

  it("DELETE /products/:id - should be able to delete a product", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .delete(`${baseUrl}/${product.id}`)
      .set("Authorization", adminToken);

    const dbProductCheck = await productsRepository.findOneBy({
      id: product.id,
    });
    expect(response.status).toBe(204);
    expect(dbProductCheck.available).toBeFalsy();
  });
  it("DELETE /products/:id - should not be able to soft delete a product without authentication", async () => {
    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app).delete(`${baseUrl}/${product.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("DELETE /products/:id - should not be able to soft delete a product without admin permission", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .delete(`${baseUrl}/${product.id}`)
      .set("Authorization", userToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
  it("DELETE /products/:id - should not be able to delete a product with invalid ID", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
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
