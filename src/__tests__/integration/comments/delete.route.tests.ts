import {
  mockedAdminLogin,
  mockedAdminRequest,
  mockedCommentRequest,
  mockedInvalidIdNumber,
  mockedProductRequest,
  mockedUserLogin,
  mockedUserRequest2,
} from "../../mocks";
import {
  AppDataSource,
  DataSource,
  app,
  mockedUserRequest,
  request
} from "../index";
import {
  usersRepository,
  productsRepository,
  commentsRepository,
} from "../../../utils/repositories.ultil";

describe("/products/comments/:id", () => {
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

  it("DELETE /products/comments/:id - should be able to delete a comment", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/comments/${comment.id}`)
      .set("Authorization", userToken);

    const dbCommentCheck = await commentsRepository.findOneBy({
      id: comment.id,
    });

    expect(response.status).toBe(204);
    expect(dbCommentCheck).toBeNull();
  });

  it("DELETE /products/comments/:id - should not be able to delete a comment without authentication", async () => {
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

    const response = await request(app).delete(
      `${baseUrl}/comments/${comment.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /products/comments/:id - should not be able to delete a comment with invalid id", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/comments/${mockedInvalidIdNumber}`)
      .set("Authorization", userToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /products/comments/:id - should not be able to delete another user comments being a normal user", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const userOwnerOfCommentToBeDeleted =
      usersRepository.create(mockedUserRequest2);
    await usersRepository.save(userOwnerOfCommentToBeDeleted);

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user: userOwnerOfCommentToBeDeleted,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/comments/${comment.id}`)
      .set("Authorization", userToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /products/comments/:id - should be able to delete another user comments being an admin", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const userOwnerOfCommentToBeDeleted =
      usersRepository.create(mockedUserRequest);
    await usersRepository.save(userOwnerOfCommentToBeDeleted);

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user: userOwnerOfCommentToBeDeleted,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .delete(`${baseUrl}/comments/${comment.id}`)
      .set("Authorization", adminToken);

    const dbCommentCheck = await commentsRepository.findOneBy({
      id: comment.id,
    });

    expect(response.status).toBe(204);
    expect(dbCommentCheck).toBeNull();
  });
});
