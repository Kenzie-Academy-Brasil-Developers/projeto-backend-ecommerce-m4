import { IEmailRequest } from "../../interfaces/email.interface";
import { sendEmail } from "../../utils/nodemailer.util";
import {
  usersRepository,
  productsRepository,
  ordersRepository,
  ordersProductsRepository,
} from "../../utils/repositories.ultil";

const createOrderService = async (
  dataOrder: any,
  idUser: string
): Promise<{ message: string }> => {
  const user = await usersRepository.findOneBy({ id: idUser });

  const newOrder = ordersRepository.create({
    ...dataOrder,
    user,
  });

  const ordersCreated = await ordersRepository.save(newOrder);

  for (let i = 0; i < dataOrder.length; i++) {
    const product = dataOrder[i];

    const newOrdersProduct = ordersProductsRepository.create({
      ...product,

      orders: ordersCreated,
    });

    await ordersProductsRepository.save(newOrdersProduct);

    const findProduct = await productsRepository.findOneBy({
      id: product.product,
    });

    await productsRepository.update(product.product, {
      ...findProduct,
      stock: findProduct.stock - product.amount,
    });

    if (findProduct.stock === 0) {
      await productsRepository.update(findProduct.id, {
        ...findProduct,
        available: false,
      });
    }
  }

  try {
    const email: IEmailRequest = {
      subject: `Olá, ${user.name}!`,
      text: "Compra realizada com sucesso!",
      to: user.email,
      html: `<div
      style="background-color: rgb(137, 128, 128); text-align: center; width: 90%; padding: 20px;"
    >
      <h1>Caro, ${user.name}</h1>
    
      <p>
      Gostaríamos de informar que sua compra foi concluída com sucesso. Agradecemos por escolher nosso e-commerce e esperamos que você esteja satisfeito com sua compra.
      </p>
      
      <p>
      Qualquer dúvida ou problema, por favor, não hesite em nos contatar.
      </p>
     
      <p>
      Agradecemos novamente pela sua escolha.
      </p>
      
      <p>Atenciosamente,</p>
      
      <p>Equipe de atendimento ao cliente do e-commerce</p>
    </div>`,
    };

    await sendEmail(email);
  } catch (error) {
    console.log(error);
  }

  return { message: "order created successfully" };
};

export default createOrderService;
