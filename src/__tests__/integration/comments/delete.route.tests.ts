import {
  mockedAdminLogin,
  mockedAdminRequest,
  mockedCommentRequest,
  mockedCommentUpdateRequest,
  mockedInvalidCommentRequest,
  mockedInvalidCommentUpdateRequest,
  mockedInvalidIdNumber,
  mockedProductRequest,
  mockedUserLogin,
  mockedUserRequest2,
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

  it("DELETE /products/:id/comments/:id - should be able to delete a comment", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/${product.id}/comments/${comment.id}`)
      .set("Authorization", userToken);

    const dbCommentCheck = await commentsRepository.findOneBy({
      id: comment.id,
    });

    expect(response.status).toBe(204);
    expect(dbCommentCheck).toBeNull();
  });

  it("DELETE /products/:id/comments/:id - should not be able to delete a comment without authentication", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user,
    });
    await commentsRepository.save(comment);

    const response = await request(app).delete(
      `${baseUrl}/${product.id}/comments/${comment.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /products/:id/comments/:id - should not be able to delete a comment with invalid product id", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/${mockedInvalidIdNumber}/comments/${comment.id}`)
      .set("Authorization", userToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /products/:id/comments/:id - should not be able to delete another user comments being a normal user", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const userOwnerOfCommentToBeDeleted =
      userRepository.create(mockedUserRequest2);
    await userRepository.save(userOwnerOfCommentToBeDeleted);

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user: userOwnerOfCommentToBeDeleted,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/${product.id}/comments/${comment.id}`)
      .set("Authorization", userToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /products/:id/comments/:id - should be able to delete another user comments being an admin", async () => {
    const admin = userRepository.create(mockedAdminRequest);
    await userRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userOwnerOfCommentToBeDeleted =
      userRepository.create(mockedUserRequest);
    await userRepository.save(userOwnerOfCommentToBeDeleted);

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user: userOwnerOfCommentToBeDeleted,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/${product.id}/comments/${comment.id}`)
      .set("Authorization", adminToken);

    const dbCommentCheck = await commentsRepository.findOneBy({
      id: comment.id,
    });

    expect(response.status).toBe(204);
    expect(dbCommentCheck).toBeNull();
  });
});
