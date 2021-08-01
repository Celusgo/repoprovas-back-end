import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Subject from "./Subject";
import Teacher from "./Teacher";
import Category from "./Category";

@Entity("tests")
export default class Tests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @Column()
  subjectId: number;

  @Column()
  teacherId: number;

  @Column()
  link: string;

  @ManyToOne(() => Subject, subject => subject.id)
  subject: Subject[];

  @ManyToOne(() => Teacher, teacher => teacher.id)
  teacher: Teacher[];

  @ManyToOne(() => Category, category => category.id)
  category: Category[];
}