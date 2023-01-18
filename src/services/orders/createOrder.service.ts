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
  const productRepository = AppDataSource.getRepository(Products);

  const user = await userRepository.findOneBy({ id: idUser });

  const newOrder = orderRepository.create({
    ...dataOrder,
    user,
  });

  const ordersCreated = await orderRepository.save(newOrder);

  dataOrder.forEach(async (products) => {
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
