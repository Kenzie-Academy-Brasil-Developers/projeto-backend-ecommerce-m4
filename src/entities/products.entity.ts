import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comments } from "./comments.entity";
import { OrdersProducts } from "./ordersProducts.entity";

@Entity("products")
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  @Column()
  amount: number;

  @Column({ default: true })
  available: boolean;

  @OneToMany(() => Comments, (comments) => comments.product)
  comments: Comments[];

  @OneToMany(() => OrdersProducts, (orders) => orders.product)
  ordersProduct: OrdersProducts[];
}
