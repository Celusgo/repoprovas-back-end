import { getRepository } from "typeorm";

import Period from "../entities/Period";

export async function getPeriods() {
  const subject = await getRepository(Period).find({
    relations: ["subject"],
    order: {id: 'ASC'}
  });
  
  return subject;
}