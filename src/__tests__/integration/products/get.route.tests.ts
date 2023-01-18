import {
  AppDataSource,
  DataSource,
  app,
  request,
  mockedInvalidIdNumber,
  mockedProductRequest,
} from "../index";
import {productsRepository} from "../../../utils/repositories.ultil"

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
    await productsRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET /products - should be able to list all products", async () => {
    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app).get(baseUrl);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("stock");
  });
  it("GET /products/:id - should be able to list specific product", async () => {
    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app).get(`${baseUrl}/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("stock");
  });
  it("GET /products/:id - should not be able to list specific product with invalid Id", async () => {
    const response = await request(app).get(
      `${baseUrl}/${mockedInvalidIdNumber}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
