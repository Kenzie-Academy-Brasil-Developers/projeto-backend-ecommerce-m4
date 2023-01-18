import {
  mockedAdminLogin,
  mockedAdminRequest,
  mockedInvalidIdNumber,
  mockedProductRequest,
  mockedUserLogin,
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
} from "../../../utils/repositories.ultil";

describe("/orders/:id", () => {
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

  beforeEach(async () => {
    await ordersProductsRepository.createQueryBuilder().delete().execute();
    await productsRepository.createQueryBuilder().delete().execute();
    await ordersRepository.createQueryBuilder().delete().execute();
    await usersRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET /orders/:id - should be able to list orders", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const order = ordersRepository.create({ user });
    await ordersRepository.save(order);

    const orderProduct = ordersProductsRepository.create({
      amount: 10,
      orders: order,
      product,
    });
    await ordersProductsRepository.save(orderProduct);

    const response = await request(app)
      .get(`${baseUrl}/${order.id}`)
      .set("Authorization", adminToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("ordersProducts");
    expect(response.body.ordersProducts[0]).toHaveProperty("id");
  });
  it("GET /orders/:id - should not be able to list orders with invalid id", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const order = ordersRepository.create({ user });
    await ordersRepository.save(order);

    const orderProduct = ordersProductsRepository.create({
      amount: 10,
      orders: order,
      product,
    });
    await ordersProductsRepository.save(orderProduct);

    const response = await request(app)
      .get(`${baseUrl}/${mockedInvalidIdNumber}`)
      .set("Authorization", adminToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
  it("GET /orders/:id - should not be able to list orders without authentication", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const order = ordersRepository.create({ user });
    await ordersRepository.save(order);

    const orderProduct = ordersProductsRepository.create({
      amount: 10,
      orders: order,
      product,
    });
    await ordersProductsRepository.save(orderProduct);

    const response = await request(app).get(`${baseUrl}/${order.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  it("GET /orders/:id - should not be able to list orders without beeing admin", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const product = productsRepository.create(mockedProductRequest);
    await productsRepository.save(product);

    const order = ordersRepository.create({ user });
    await ordersRepository.save(order);

    const orderProduct = ordersProductsRepository.create({
      amount: 10,
      orders: order,
      product,
    });
    await ordersProductsRepository.save(orderProduct);

    const response = await request(app)
      .get(`${baseUrl}/${order.id}`)
      .set("Authorization", userToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
