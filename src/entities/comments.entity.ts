import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Products } from "./products.entity";
import { User } from "./user.entity";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  comments_text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Products, (product) => product.comments)
  product: Products;
}
