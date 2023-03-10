import {
  AppDataSource,
  DataSource,
  app,
  mockedInvalidId,
  mockedUserUpdate2,
  mockedAdminLogin,
  mockedAdminRequest,
  mockedUserAddressUpdate,
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
  mockedUserUpdate,
  request,
} from "../index";
import {usersRepository} from "../../../utils/repositories.ultil"

describe("/users", () => {
  let connection: DataSource;
  const baseUrl = "/users";
  
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
    await usersRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it("PATCH /users/:id - should be able to update an user", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${user.id}`)
      .set("Authorization", userToken)
      .send(mockedUserUpdate);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(mockedUserUpdate.name);
    expect(response.body.age).toBe(mockedUserUpdate.age);
  });

  it("PATCH /users/:id - should not be able to update user without authentication", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);

    const response = await request(app).patch(`/users/${user.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /users/:id - should not be able to update user with invalid id", async () => {
    const admin = usersRepository.create(mockedAdminRequest);
    await usersRepository.save(admin);
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdminLogin);
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${mockedInvalidId}`)
      .set("Authorization", adminToken)
      .send(mockedUserUpdate);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /users/:id - should not be able to update isAdm field value", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${user.id}`)
      .set("Authorization", userToken)
      .send({ isAdm: true });

    const userInDatabase = await usersRepository.findOneBy({ id: user.id });

    expect(response.status).toBe(200);
    expect(userInDatabase.isAdm).toBe(false);
  });

  it("PATCH /users/:id - should not be able to update user id", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`${baseUrl}/${user.id}`)
      .set("Authorization", userToken)
      .send({ id: mockedInvalidId });

    const userInDatabase = await usersRepository.findOneBy({ id: user.id });

    expect(response.status).toBe(200);
    expect(userInDatabase.id).toBe(user.id);
  });

  it("PATCH /users/:id - should not be able to update another user without adm permission", async () => {
    const userThatWillUpdate = usersRepository.create(mockedUserRequest);
    await usersRepository.save(userThatWillUpdate);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userThatWillUpdateToken = `Bearer ${userLoginResponse.body.token}`;

    const userToUpdate = usersRepository.create(mockedUserRequest2);
    await usersRepository.save(userToUpdate);

    const response = await request(app)
      .patch(`${baseUrl}/${userToUpdate.id}`)
      .set("Authorization", userThatWillUpdateToken)
      .send(mockedUserUpdate2);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /users/:id - should not be able to update to an email that already exists", async () => {
    const userThatWillUpdate = usersRepository.create(mockedUserRequest);
    await usersRepository.save(userThatWillUpdate);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userThatWillUpdateToken = `Bearer ${userLoginResponse.body.token}`;

    const secondUser = usersRepository.create(mockedUserRequest2);
    await usersRepository.save(secondUser);

    const response = await request(app)
      .patch(`${baseUrl}/${userThatWillUpdate.id}`)
      .set("Authorization", userThatWillUpdateToken)
      .send({ email: secondUser.email });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /address - should be able to update user address", async () => {
    const user = usersRepository.create(mockedUserRequest);
    await usersRepository.save(user);
    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedUserLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/address`)
      .set("Authorization", userToken)
      .send(mockedUserAddressUpdate);

    expect(response.status).toBe(200);
    expect(response.body.city).toBe(mockedUserAddressUpdate.city);
    expect(response.body.state).toBe(mockedUserAddressUpdate.state);
    expect(response.body.street).toBe(mockedUserAddressUpdate.street);
    expect(response.body.number).toBe(mockedUserAddressUpdate.number);
    expect(response.body.zipCode).toBe(mockedUserAddressUpdate.zipCode);
  });
});
