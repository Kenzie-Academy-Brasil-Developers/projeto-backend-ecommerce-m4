import { create } from "domain";
import AppDataSource from "../../data-source";
import { IEmailRequest } from "../../email.interface";
import { Orders } from "../../entities/orders.entity";
import { OrdersProducts } from "../../entities/ordersProducts.entity";
import { User } from "../../entities/user.entity";
import { sendEmail } from "../../nodemailer.util";

const createOrderService = async (dataOrder, idUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const orderRepository = AppDataSource.getRepository(Orders);
  const orderProductsRepository = AppDataSource.getRepository(OrdersProducts);

  const user = await userRepository.findOneBy({ id: idUser });

  const newOrder = orderRepository.create({
    ...dataOrder,
    user,
  });
  const ordersCreated = await orderRepository.save(newOrder);

  dataOrder.forEach(async (product) => {
    const newOrdersProduct = orderProductsRepository.create({
      ...product,
      orders: ordersCreated,
    });
    await orderProductsRepository.save(newOrdersProduct);
  });

  try {
    const email: IEmailRequest = {
      subject: `Bem vindo ${user.name}!`,
      text: "Compra realizada com sucesso!",
      to: user.email,
      html: '<div style="background-color: red"><h1>Hello</h1></div>',
    };

    await sendEmail(email);
  } catch (error) {
    console.log(error);
  }

  return { message: "order created successfully" };
};

export default createOrderService;
