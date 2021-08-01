import { getRepository } from "typeorm";

import Teacher from "../entities/Teacher";

export async function findTeachers (teacher:string) {
  const teachers = await getRepository(Teacher).findOne({
    name: teacher
  });
  
  return teachers;
}
