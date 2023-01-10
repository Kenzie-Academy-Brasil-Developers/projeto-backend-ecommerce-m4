import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrdersProducts } from "./ordersProducts.entity";
import { User } from "./user.entity";

@Entity("orders")
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderedAt: Date;

  @Column({ default: false })
  delivered: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrdersProducts, (ordersProducts) => ordersProducts.orders)
  ordersProducts: OrdersProducts[];
}
