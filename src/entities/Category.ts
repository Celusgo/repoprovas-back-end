import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Tests from "./Tests";

@Entity("category")
export default class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Tests, tests => tests.categoryId)
  tests:Tests[];
}