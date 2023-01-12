import {
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
  Orders,
  OrdersProducts,
} from "../index";

describe("/orders", () => {
  let connection: DataSource;
  const baseUrl = "/orders";
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Products);
  const ordersRepository = AppDataSource.getRepository(Orders);
  const ordersProductsRepository = AppDataSource.getRepository(OrdersProducts);

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
    await ordersProductsRepository.createQueryBuilder().delete().execute();
    await ordersRepository.createQueryBuilder().delete().execute();
    await productRepository.createQueryBuilder().delete().execute();
    await userRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /orders - should be able to create an order", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send([
        {
          product: product.id,
          amount: 10,
        },
      ]);
    const allOrders = await ordersRepository.find();

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("order created successfully");
    expect(allOrders.length).toBe(1);
  });
  it("POST /orders - should not be able to create an order without authentication", async () => {
    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .send([
        {
          product: product.id,
          amount: 10,
        },
      ]);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("POST /orders - should not be able to create an order with invalid data", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send([
        {
          product: product.id,
        },
      ]);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  it("POST /orders - should not be able to create an order with invalid products", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productRepository.create(mockedProductRequest);
    await productRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send([
        {
          product: mockedInvalidIdNumber,
          amount: 10,
        },
      ]);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
