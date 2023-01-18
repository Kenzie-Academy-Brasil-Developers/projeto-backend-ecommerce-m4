import AppDataSource from "../../data-source";
import { IEmailRequest } from "../../interfaces/email.interface";
import { Orders } from "../../entities/orders.entity";
import { OrdersProducts } from "../../entities/ordersProducts.entity";
import { Products } from "../../entities/products.entity";
import { User } from "../../entities/user.entity";
import { sendEmail } from "../../utils/nodemailer.util";

const createOrderService = async (
  dataOrder: any,
  idUser: string
): Promise<{ message: string }> => {
  const userRepository = AppDataSource.getRepository(User);
  const orderRepository = AppDataSource.getRepository(Orders);
  const orderProductsRepository = AppDataSource.getRepository(OrdersProducts);
<<<<<<< HEAD
=======
  const productRepository = AppDataSource.getRepository(Products);
>>>>>>> 061a5f71cbd2c20acf6ee82dc5bff5534c17741b

  const user = await userRepository.findOneBy({ id: idUser });

  const newOrder = orderRepository.create({
    ...dataOrder,
    user,
  });

  const ordersCreated = await orderRepository.save(newOrder);

<<<<<<< HEAD
  dataOrder.forEach(async (product: any) => {
=======
  dataOrder.forEach(async (products) => {
>>>>>>> 061a5f71cbd2c20acf6ee82dc5bff5534c17741b
    const newOrdersProduct = orderProductsRepository.create({
      ...products,
      orders: ordersCreated,
    });

    await orderProductsRepository.save(newOrdersProduct);

    const findProduct = await productRepository.findOneBy({
      id: products.product,
    });

    await productRepository.update(products.product, {
      ...findProduct,
      amount: findProduct.amount - 1,
    });

    if (findProduct.amount === 0) {
      await productRepository.update(findProduct.id, {
        ...findProduct,
        available: false,
      });
    }
  });

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
