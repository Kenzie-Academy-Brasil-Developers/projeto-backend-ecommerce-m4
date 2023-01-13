import { mockedInvalidIdNumber, mockedProductRequest } from "../../mocks";
import {
  AppDataSource,
  DataSource,
  User,
  app,
  request,
  Comments,
  Products,
} from "../index";

describe("/products/:id/comments", () => {
  let connection: DataSource;
  const baseUrl = "/products";
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Products);
  const commentsRepository = AppDataSource.getRepository(Comments);

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
    await commentsRepository.createQueryBuilder().delete().execute();
    await productRepository.createQueryBuilder().delete().execute();
    await userRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET /products/:id/comments - should be able to list a product's comments", async () => {
    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app).get(
      `${baseUrl}/${product.id}/comments`
    );

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("comments_text");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("updatedAt");
    expect(response.body[0].user).toHaveProperty("id");
    expect(response.body[0].product).toHaveProperty("id");
  });

  it("GET /products/:id/comments - should not be able to list a comment with invalid product id", async () => {
    const response = await request(app).get(
      `${baseUrl}/${mockedInvalidIdNumber}/comments`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
