import {
  AppDataSource,
  DataSource,
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

  it("PATCH /products/:id - should be able to update a product", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

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
    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .patch(`${baseUrl}/${product.id}`)
      .send(mockedProductUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("PATCH /products/:id - should not be able to update a product without admin permission", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .patch(`${baseUrl}/${product.id}`)
      .set("Authorization", userToken)
      .send(mockedProductUpdate);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
  it("PATCH /products/:id - should not be able to update a product with a name that already exists", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const productToBeUpdated = productsRepository.create(mockedProductRequest2);
    await productsRepository.save(productToBeUpdated);

    const response = await request(app)
      .patch(`${baseUrl}/${productToBeUpdated.id}`)
      .set("Authorization", adminToken)
      .send(mockedInvalidProductUpdateName);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
  it("PATCH /products/:id - should not be able to update with invalid Id", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
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
