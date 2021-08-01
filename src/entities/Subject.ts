import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import Period from "./Period";
import Teacher from "./Teacher";
import Tests from "./Tests";

@Entity("subject")
export default class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Period, period => period.name)
  period: Period;

  @ManyToMany(()=> Teacher, teacher => teacher.subject)
  @JoinTable({name:'teacher_subject'})
  teacher:Teacher[];

  @OneToMany(() => Tests, tests => tests.subjectId)
  tests:Tests[];

}
