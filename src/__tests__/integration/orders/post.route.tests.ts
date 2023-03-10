import {
  mockedInvalidIdNumber,
  mockedProductRequest,
  mockedUserLogin
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
  ordersProductsRepository,
  ordersRepository,
  commentsRepository
} from "../../../utils/repositories.ultil";

describe("/orders", () => {
  let connection: DataSource;
  const baseUrl = "/orders";
  
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (resp) => {
        connection = resp;
      })
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterEach(async () => {
    await commentsRepository.createQueryBuilder().delete().execute();
    await ordersProductsRepository.createQueryBuilder().delete().execute();
    await ordersRepository.createQueryBuilder().delete().execute();
    await productsRepository.createQueryBuilder().delete().execute();
    await usersRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /orders - should be able to create an order", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send([
        {
          product: product.id,
          amount: 1,
        },
      ]);
    const allOrders = await ordersRepository.find();

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("order created successfully");
    expect(allOrders.length).toBe(1);
  });
  it("POST /orders - should not be able to create an order without authentication", async () => {
    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .send([
        {
          product: product.id,
          amount: 1,
        },
      ]);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("POST /orders - should not be able to create an order with invalid data", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

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

  it("POST /orders - should not be able to create an order if the product amount is out of stock", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send([
        {
          product: product.id,
          amount: 10,
        },
      ]);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /orders - should not be able to create an order if the product isn't available", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create({
      name: "Boneco troll",
      description: "Action figure",
      price: 12.5,
      stock: 10,
      available: false,
    });
    await productsRepository.save(product);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send([
        {
          product: product.id,
          amount: 1,
        },
      ]);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /orders - should not be able to create an order with invalid products", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", userToken)
      .send([
        {
          product: mockedInvalidIdNumber,
          amount: 1,
        },
      ]);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});