const mockedUserRequest = {
  name: "Lucas Garcia",
  email: "user@mail.com",
  password: "1234",
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    street: "Rua desconhecida",
    number: "22",
    zipCode: "22031123",
  },
  age: 22,
};

const mockedAdminRequest = {
  name: "Lucas Garcia",
  email: "admin@mail.com",
  password: "1234",
  isAdm: true,
  address: {
    city: "Tabatinga",
    state: "AM",
    street: "Rua desconhecida",
    number: "22",
    zipCode: "98031123",
  },
  age: 22,
};

const mockedUserRequest2 = {
  name: "Gabriel Magalhães",
  email: "pikachu@mail.com",
  password: "1234",
  address: {
    city: "Belo Horizonte",
    state: "MG",
    street: "Rua desconhecida",
    number: "2222",
    zipCode: "29331123",
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
    zipCode: "22031123",
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
  email: "user@mail.com",
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

const mockedUserUpdate2 = {
  name: "Garcia Magalhães",
  age: 14,
};

const mockedProductRequest = {
  name: "Boneco Goku",
  description: "Action figure",
  price: 12.5,
  amount: 2,
};

const mockedProductRequest2 = {
  name: "Boneco sasuke",
  description: "Action figure",
  price: 12.5,
  amount: 2,
};

const mockedProductUpdate = {
  name: "Boneco Naruto",
  description: "Action figure melhor ainda",
  price: 25.0,
  amount: 4,
};

const mockedCommentRequest = {
  comments_text: "Esse produto é muito bom!",
};

const mockedCommentUpdateRequest = {
  comments_text: "Esse produto tá ruimzao agora",
};

const mockedInvalidId = "4a1f1b51-eb60-4b1f-8356-59c4ccf24bf4";

const mockedInvalidIdNumber = 9999999999;

const mockedInvalidUserLogin = {
  email: "tsunode@mail.com",
  password: "0000",
};

const mockedInvalidProductUpdateName = {
  name: "Boneco Goku",
};

const mockedInvalidCommentUpdateRequest = {
  comments_text: "Esse produto tá ruimzao",
  campo_invalido: "hahahaaa",
};

const mockedInvalidProductRequest = {
  description: "Action figure",
  amount: 2,
};

const mockedInvalidProductUpdateRequest = {
  anime: "Naruto",
  material: "Plástico",
};

const mockedInvalidCommentRequest = {
  comments_text: "Tem que dar erro",
  campo_invalido: "hahaha",
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
  mockedInvalidId,
  mockedUserUpdate2,
  mockedInvalidUserLogin,
  mockedProductRequest,
  mockedInvalidProductRequest,
  mockedProductUpdate,
  mockedProductRequest2,
  mockedInvalidProductUpdateName,
  mockedInvalidProductUpdateRequest,
  mockedInvalidIdNumber,
  mockedCommentRequest,
  mockedInvalidCommentRequest,
  mockedCommentUpdateRequest,
  mockedInvalidCommentUpdateRequest,
};
