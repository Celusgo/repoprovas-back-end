import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import Subject from "./Subject";
import Tests from "./Tests";

@Entity("teacher")
export default class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(()=> Subject, subject => subject.teacher)
  @JoinTable({name:"teacher_subject"})
  subject:Subject[];

  @OneToMany(() => Tests, tests => tests.teacherId)
  tests:Tests[];
};
