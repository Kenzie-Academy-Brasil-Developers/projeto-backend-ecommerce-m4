import {
  mockedCommentRequest,
  mockedInvalidIdNumber,
  mockedProductRequest,
  mockedUserRequest,
} from "../../mocks";
import {
  AppDataSource,
  DataSource,
  app,
  request
} from "../index";
import {
  usersRepository,
  productsRepository,
  commentsRepository,
} from "../../../utils/repositories.ultil";

describe("/products/:id/comments", () => {
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
    await commentsRepository.createQueryBuilder().delete().execute();
    await productsRepository.createQueryBuilder().delete().execute();
    await usersRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET /products/:id/comments - should be able to list a product's comments", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user,
    });
    await commentsRepository.save(comment);

    const response = await request(app).get(
      `${baseUrl}/${product.id}/comments`
    );

    expect(response.status).toBe(200);
    expect(response.body.comments[0]).toHaveProperty("id");
    expect(response.body.comments[0]).toHaveProperty("comments_text");
    expect(response.body.comments[0]).toHaveProperty("createdAt");
    expect(response.body.comments[0]).toHaveProperty("updatedAt");
  });

  it("GET /products/:id/comments - should not be able to list a comment with invalid product id", async () => {
    const response = await request(app).get(
      `${baseUrl}/${mockedInvalidIdNumber}/comments`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
