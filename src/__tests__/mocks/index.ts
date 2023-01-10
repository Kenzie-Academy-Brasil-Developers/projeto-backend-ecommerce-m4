const mockedUserRequest = {
  name: "Lucas Garcia",
  email: "lucas@mail.com",
  password: "1234",
  isAdm: false,
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    street: "Rua desconhecida",
    number: "22",
    zipCode: "22031-123",
  },
  age: 22,
};

const mockedAdminRequest = {
  name: "Lucas Garcia",
  email: "lucas@mail.com",
  password: "1234",
  isAdm: true,
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    street: "Rua desconhecida",
    number: "22",
    zipCode: "22031-123",
  },
  age: 22,
};

const mockedUserRequest2 = {
  name: "Gabriel Magalhães",
  email: "gabriel@mail.com",
  password: "1234",
  address: {
    city: "Belo Horizonte",
    state: "MG",
    street: "Rua desconhecida",
    number: "2222",
    zipCode: "29331-123",
  },
  age: 24,
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

const mockedAdminLogin = {
  email: "admin@mail.com",
  password: "1234",
};

const mockedUserLogin = {
  email: "lucas@mail.com",
  password: "1234",
};

const mockedUserAddressUpdate = {
  city: "São Paulo",
  state: "SP",
  street: "Rua desconhecida",
  number: "25",
  zipCode: "22031-123",
};

const mockedUserUpdate = {
  name: "Gilberto Faria",
  age: 99,
};
export {
  mockedUserRequest,
  mockedUserResponse,
  mockedUserInvalidRequest,
  mockedAdminLogin,
  mockedUserLogin,
  mockedUserAddressUpdate,
  mockedUserUpdate,
  mockedUserRequest2,
  mockedAdminRequest,
};
