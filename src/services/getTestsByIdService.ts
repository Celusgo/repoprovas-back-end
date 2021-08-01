import { getRepository } from "typeorm";

import Tests from "../entities/Tests";

export async function getById(id:number) {
  const subject = await getRepository(Tests).find({
    where:{subjectId: id},
    relations: ["subject", "teacher", "category"],
    order: {id: 'ASC'}
  });
  
  return subject;
}