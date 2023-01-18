import AppDataSource from "../../data-source";
import { IEmailRequest } from "../../interfaces/email.interface";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { IDataUserRequest } from "../../interfaces/users.interfaces";
import { sendEmail } from "../../utils/nodemailer.util";

const createUserService = async ({
  address,
  ...dataUser
}: IDataUserRequest): Promise<IDataUserRequest> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const findUser = await userRepository.findOneBy({ email: dataUser.email });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  const newAddress = addressRepository.create(address);
  await addressRepository.save(newAddress);

  const user = userRepository.create({ ...dataUser, address: newAddress });
  await userRepository.save(user);

  try {
    const email: IEmailRequest = {
      subject: `Bem vindo ${user.name}!`,
      text: "Parabéns, você acabou de criar uma consta na melhor loja nerd do multiverso",
      to: user.email,
      html: '<div style="background-color: red"><h1>Hello</h1></div>',
    };

    await sendEmail(email);
  } catch (error) {
    console.log(error);
  }

  return user;
};

export default createUserService;
