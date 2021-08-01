import { getRepository } from "typeorm";

import Tests from "../entities/Tests";

export async function getAllByTeacherId(id:number, teacherId: number) {
  const subject = await getRepository(Tests).find({
    where:{teacherId: teacherId, subjectId: id},
    relations: ["subject", "teacher", "category"],
    order: {id: 'ASC'}
  });
  
  return subject;
}