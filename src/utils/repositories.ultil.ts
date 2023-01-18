import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { Comments } from "../entities/comments.entity";
import { Orders } from "../entities/orders.entity";
import { OrdersProducts } from "../entities/ordersProducts.entity";
import { Products } from "../entities/products.entity";
import { User } from "../entities/user.entity";

const usersRepository = AppDataSource.getRepository(User);
const productsRepository = AppDataSource.getRepository(Products);
const ordersRepository = AppDataSource.getRepository(Orders);
const ordersProductsRepository = AppDataSource.getRepository(OrdersProducts);
const commentsRepository = AppDataSource.getRepository(Comments);
const addressRepository = AppDataSource.getRepository(Address);

export {
  usersRepository,
  productsRepository,
  ordersProductsRepository,
  ordersRepository,
  commentsRepository,
  addressRepository,
};
