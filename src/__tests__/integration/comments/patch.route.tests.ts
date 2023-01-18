import {
  mockedCommentRequest,
  mockedCommentUpdateRequest,
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

  it("PATCH /products/comments/:id - should be able to update a comment", async () => {
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
      .patch(`${baseUrl}/comments/${comment.id}`)
      .set("Authorization", userToken)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(200);
    expect(response.body.comments_text).toBe(
      mockedCommentUpdateRequest.comments_text
    );
  });

  it("PATCH /products/comments/:id - should not be able to update a comment without authentication", async () => {
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

    const response = await request(app)
      .patch(`${baseUrl}/comments/${comment.id}`)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /products/comments/:id - should not be able to update a comment with invalid id", async () => {
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
      .patch(`${baseUrl}/comments/${mockedInvalidIdNumber}`)
      .set("Authorization", userToken)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /products/comments/:id - should not be able to update another user comments", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const userOwnerOfComment = usersRepository.create(mockedUserRequest2);
    await usersRepository.save(userOwnerOfComment);

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const comment = commentsRepository.create({
      ...mockedCommentRequest,
      product,
      user: userOwnerOfComment,
    });
    await commentsRepository.save(comment);

    const response = await request(app)
      .patch(`${baseUrl}/comments/${comment.id}`)
      .set("Authorization", userToken)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
