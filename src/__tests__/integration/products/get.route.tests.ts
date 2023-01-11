import {
  Products,
  AppDataSource,
  DataSource,
  app,
  request,
  mockedInvalidIdNumber,
  mockedProductRequest,
} from "../index";

describe("/products", () => {
  let connection: DataSource;
  const baseUrl = "/products";
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
    await productRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET /products - should be able to list all products", async () => {
    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app).get(baseUrl);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("amount");
  });
  it("GET /products/:id - should be able to list specific product", async () => {
    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app).get(`${baseUrl}/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("amount");
  });
  it("GET /products/:id - should not be able to list specific product with invalid Id", async () => {
    const response = await request(app).get(
      `${baseUrl}/${mockedInvalidIdNumber}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
