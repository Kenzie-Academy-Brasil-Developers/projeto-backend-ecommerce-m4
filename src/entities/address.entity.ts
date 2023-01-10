import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  street: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 40 })
  number: string;
}
