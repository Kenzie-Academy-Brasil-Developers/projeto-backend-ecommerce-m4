import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";

@Entity("orders_products")
export class OrdersProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Products, (orders) => orders.ordersProduct)
  product: Products;

  @ManyToOne(() => Orders, (orders) => orders.ordersProducts)
  orders: Orders;
}
