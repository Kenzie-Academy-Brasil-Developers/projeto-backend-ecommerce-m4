import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Address } from "./address.entity";
import { Comments } from "./comments.entity";
import { Orders } from "./orders.entity";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  @Exclude()
  isAdm: boolean;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];
}
