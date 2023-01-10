const mockedUserRequest = {
  name: "Lucas Garcia",
  email: "lucas@mail.com",
  password: "1234",
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    street: "Rua desconhecida",
    number: "22",
    zipCode: "22031-123",
  },
  age: 22,
};

const mockedUserResponse = {
  name: "Lucas Garcia",
  email: "lucas@mail.com",
  age: 22,
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    street: "Rua desconhecida",
    number: "22",
    zipCode: "22031-123",
  },
};

const mockedUserInvalidRequest = {
  name: "tem que dar erro",
  age: 22,
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    street: "Rua desconhecida",
    number: "22",
  },
};

const mockedAdminRequest = {};

export { mockedUserRequest, mockedUserResponse, mockedUserInvalidRequest };
