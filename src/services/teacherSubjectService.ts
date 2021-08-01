import { getRepository } from "typeorm";

import Subject from "../entities/Subject";

export async function getTeacherSubject () {
  const teachers = await getRepository(Subject).find({
    relations: ["teacher"],
    order: {id: 'ASC'}
  });
  
  return teachers;
}
