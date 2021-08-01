import { getRepository } from "typeorm";

import Teacher from "../entities/Teacher";

export async function getSubjectTeachers () {
  const subjects = await getRepository(Teacher).find({
    relations: ["subject"],
    order: {id: 'ASC'}
  });
  
  return subjects;
}