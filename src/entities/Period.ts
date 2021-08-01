import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Subject from "./Subject";

@Entity("period")
export default class Period {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subject, subject => subject.period)
  subject: Subject[];
}