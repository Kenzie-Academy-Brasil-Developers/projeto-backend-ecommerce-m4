import { IEmailRequest } from "../../interfaces/email.interface";
import { usersRepository, addressRepository } from "../../utils/repositories.ultil";
import { AppError } from "../../errors/errors";
import { IDataUserRequest } from "../../interfaces/users.interfaces";
import { sendEmail } from "../../utils/nodemailer.util";

const createUserService = async ({
  address,
  ...dataUser
}: IDataUserRequest): Promise<IDataUserRequest> => {
  
  const findUser = await usersRepository.findOneBy({ email: dataUser.email });

  if (findUser) {
    throw new AppError("Email already exists", 409);
  }

  const newAddress = addressRepository.create(address);
  await addressRepository.save(newAddress);

  const user = usersRepository.create({ ...dataUser, address: newAddress });
  await usersRepository.save(user);

  try {
    const email: IEmailRequest = {
      subject: `Bem vindo ${user.name}!`,
      text: "Parabéns, você acabou de criar uma consta na melhor loja nerd do multiverso",
      to: user.email,
      html: `<div
      style="background-color: rgb(137, 128, 128); text-align: center; width: 90%; padding:20px;"
    >
      <h1>Bem Vindo ${user.name}</h1>
    
      <p>
        Gostaríamos de agradecer por se cadastrar em nosso e-commerce. Estamos
        entusiasmados em ter você como nosso novo cliente e esperamos que aproveite
        ao máximo sua experiência conosco.
      </p>

      <p>
        Temos uma grande variedade de produtos disponíveis para você escolher, e
        estamos sempre adicionando novos itens à nossa loja. Se você tiver alguma
        dúvida ou precisar de ajuda com sua compra, não hesite em entrar em contato
        conosco. Estamos sempre dispostos a ajudar.
      </p>
     
      <p>
        Novamente, obrigado por se cadastrar em nosso e-commerce. Esperamos vê-lo de
        volta em breve.
      </p>
      
      <p>Atenciosamente,</p>
      
      <p>Equipe de atendimento ao cliente do e-commerce</p>
    </div>`,
    };

    await sendEmail(email);
  } catch (error) {
    console.log(error);
  }

  return user;
};

export default createUserService;
