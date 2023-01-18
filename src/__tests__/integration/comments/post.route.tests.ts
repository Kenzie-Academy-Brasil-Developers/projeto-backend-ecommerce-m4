import {
  mockedCommentRequest,
  mockedInvalidCommentRequest,
  mockedInvalidIdNumber,
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
  Products,
  Comments,
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

  it("POST /products/:id/comments - should be able to create a comment", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(`${baseUrl}/${product.id}/comments`)
      .set("Authorization", userToken)
      .send(mockedCommentRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("comments_text");

    const comment = await commentsRepository.findOneBy({
      id: response.body.id,
    });

    expect(comment).toBeTruthy();
  });

  it("POST /products/:id/comments - should be able to create a comment excluding additional invalid data", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(`${baseUrl}/${product.id}/comments`)
      .set("Authorization", userToken)
      .send(mockedInvalidCommentRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("comments_text");
    expect(response.body).not.toHaveProperty("campo_invalido");
  });

  it("POST /products/:id/comments - should not be able to create a comment without authentication", async () => {
    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(`${baseUrl}/${product.id}/comments`)
      .send(mockedCommentRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /products/:id/comments - should not be able to create a comment with invalid product id", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .post(`${baseUrl}/${mockedInvalidIdNumber}/comments`)
      .set("Authorization", userToken)
      .send(mockedInvalidCommentRequest);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
